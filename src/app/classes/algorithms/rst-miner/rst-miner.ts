import { PetriNet } from '../../models/petri-net/petri-net';
import { RstMinerSettings } from '../../models/miner-settings/rst-miner-settings';
import { Eventlog } from '../../models/eventlog/eventlog';
import { LogToPartialOrderTransformer } from '../concurrency-oracle/log-to-partial-order-transformer';
import { PetriNetIsomorphismTester } from '../petri-net/isomorphism/petri-net-isomorphism-tester';
import { PetriNetToPartialOrderTransformer } from '../transformation/petri-net-to-partial-order-transformer';
import { PartialOrderIsomorphismTester } from '../partial-order/isomorphism/partial-order-isomorphism-tester';
import { ConcurrencyOracle } from '../concurrency-oracle/concurrency-oracle';
import { PartialOrderNetWithContainedTraces } from '../../models/petri-net/partial-order-net-with-contained-traces';
import { Transition } from '../../models/petri-net/transition';
import { RandomPlaceGenerator } from './generators/random-place-generator';
import { Place } from '../../models/petri-net/place';
import { LpoFirePlaceValidator } from '../petri-net/validation/lpo-fire-place-validator';
import { ImplicitPlaceIdentifierConfigWrapper } from './implicit/implicit-place-identifier-config-wrapper';
import { RstMinerResult } from './rst-miner-result';
import { Duration } from 'ts-duration';

export class RstMiner {
    private readonly _maxPlaceFailingPercentage;

    public static MINING_ERROR = new Error(
        'given .type log string can not be parsed'
    );

    private _concurrencyOracle: ConcurrencyOracle;
    private _logToPartialOrderTransformer: LogToPartialOrderTransformer;
    private _petriNetToPartialOrderTransformer: PetriNetToPartialOrderTransformer;
    private _randomPlaceGenerator: RandomPlaceGenerator;

    constructor(private _minerSettings: RstMinerSettings) {
        this._concurrencyOracle =
            _minerSettings.concurrencyOracle.generateConcurrencyOracle();
        this._petriNetToPartialOrderTransformer =
            new PetriNetToPartialOrderTransformer();
        this._logToPartialOrderTransformer = new LogToPartialOrderTransformer(
            new PetriNetIsomorphismTester(
                new PetriNetToPartialOrderTransformer(),
                new PartialOrderIsomorphismTester()
            ),
            _minerSettings.partialOrderTransformation.toConfig()
        );
        this._randomPlaceGenerator =
            _minerSettings.randomPlaceGenerator.buildRandomPlaceGenerator();
        this._maxPlaceFailingPercentage =
            _minerSettings.noiseReduction.maxPlaceFailingPercentage;
    }

    public mine(eventlog: Eventlog): RstMinerResult {
        let counterTestedPlaces: number;
        const totalNumberOfTraces = eventlog.traces.length;

        eventlog = this._minerSettings.noiseReduction.preFilterNoise(eventlog);
        const numberOfTracesAfterNoiseFilter = eventlog.traces.length;

        const concurrencyRelation =
            this._concurrencyOracle.determineConcurrency(eventlog);
        const partialOrderNetsWithContainedTraces =
            this._logToPartialOrderTransformer.transformToPartialOrders(
                eventlog,
                concurrencyRelation
            );
        const partialOrders = partialOrderNetsWithContainedTraces
            .map(
                partialOrderNetWithContainedTraces =>
                    partialOrderNetWithContainedTraces.net
            )
            .map(partialOrderNet =>
                this._petriNetToPartialOrderTransformer.transform(
                    partialOrderNet
                )
            );

        const allTransitionActivities = RstMiner.calculateTransitionActivities(
            partialOrderNetsWithContainedTraces
        );
        const allContainedTraces = partialOrderNetsWithContainedTraces.flatMap(
            partialOrderNetsWithContainedTraces =>
                partialOrderNetsWithContainedTraces.containedTraces
        );

        let implicitPlaceIdentifier;
        if (
            this._minerSettings.implicitPlaceIdentification
                .isPlaceRemovalEnabled
        ) {
            implicitPlaceIdentifier = new ImplicitPlaceIdentifierConfigWrapper(
                [...allTransitionActivities],
                allContainedTraces,
                this._minerSettings
            );
        } else {
            implicitPlaceIdentifier = undefined;
        }

        let petriNet = this.createFlowerModel(allTransitionActivities);

        const lpoFirePlaceValidators = partialOrders
            .map(partialOrder => new LpoFirePlaceValidator(partialOrder))
            // Sort desc, to fire less validators for reaching failed state for place
            .sort((a, b) => b.lpoFrequency! - a.lpoFrequency!);

        const terminationConditionReachedFct =
            this._minerSettings.terminationCondition.buildIsTerminationConditionReachedFunction();

        counterTestedPlaces = this._randomPlaceGenerator.init(
            petriNet,
            partialOrders
        );

        const miningBeginTime = new Date();
        while (!terminationConditionReachedFct(petriNet, counterTestedPlaces)) {
            const clonedPetriNet = petriNet.clone();

            const addedPlace = this._randomPlaceGenerator.insertRandomPlace(
                'p' + counterTestedPlaces++,
                clonedPetriNet
            );

            if (
                !this.isGeneratedPlaceValid(
                    addedPlace,
                    clonedPetriNet,
                    lpoFirePlaceValidators,
                    numberOfTracesAfterNoiseFilter
                )
            ) {
                continue;
            }

            petriNet = clonedPetriNet;

            if (implicitPlaceIdentifier != null) {
                counterTestedPlaces =
                    implicitPlaceIdentifier.removeImplicitPlacesForAndIncreaseCounter(
                        addedPlace,
                        petriNet,
                        counterTestedPlaces
                    );
            }
        }
        return new RstMinerResult(
            petriNet,
            Duration.since(miningBeginTime),
            totalNumberOfTraces,
            numberOfTracesAfterNoiseFilter,
            partialOrders.length,
            counterTestedPlaces
        );
    }

    private static calculateTransitionActivities(
        partialOrders: Array<PartialOrderNetWithContainedTraces>
    ): Set<string> {
        return new Set(
            partialOrders
                .flatMap(value => value.net.getTransitions())
                .map(transition => transition.label)
                .filter(transitionActivity => transitionActivity != null)
                .map(transitionActivity => transitionActivity!)
        );
    }

    private createFlowerModel(transitionActivities: Set<string>): PetriNet {
        const allTransitions = [...transitionActivities].map(
            activity => new Transition(activity, activity)
        );

        const petriNet = new PetriNet();

        allTransitions.forEach(transition => {
            petriNet.addTransition(transition);
        });

        return petriNet;
    }

    private isGeneratedPlaceValid(
        addedPlace: Place,
        clonedPetriNet: PetriNet,
        lpoFirePlaceValidators: LpoFirePlaceValidator[],
        totalTraces: number
    ) {
        let alreadyFailedTraces = 0;
        for (const lpoFirePlaceValidator of lpoFirePlaceValidators) {
            const validationResultForPlaceAndOrder =
                lpoFirePlaceValidator.validate(
                    clonedPetriNet.clone(),
                    addedPlace.id!,
                    this._minerSettings.processModelCharacteristics
                        .placesEmptyAtEnd
                );
            if (!validationResultForPlaceAndOrder.valid) {
                alreadyFailedTraces += lpoFirePlaceValidator.lpoFrequency!;
                if (
                    alreadyFailedTraces / totalTraces >
                    this._maxPlaceFailingPercentage
                ) {
                    return false;
                }
            }
        }
        return true;
    }
}
