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
import { ImplicitPlaceIdentifier } from '../petri-net/transformation/implicit-place-identifier';
import { Place } from '../../models/petri-net/place';
import { TemplatePlace } from '../petri-net/transformation/classes/template-place';
import { LpoFirePlaceValidator } from '../petri-net/validation/lpo-fire-place-validator';

export class RstMiner {
    private _counterTestedPlacesLastRun = 0;

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
    }

    public mine(eventlog: Eventlog): PetriNet {
        this._counterTestedPlacesLastRun = 0;
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
        const implicitPlaceIdentifier = new ImplicitPlaceIdentifier(
            [...allTransitionActivities],
            partialOrderNetsWithContainedTraces.flatMap(
                partialOrderNetsWithContainedTraces =>
                    partialOrderNetsWithContainedTraces.containedTraces
            )
        );

        let petriNet = this.createFlowerModel(allTransitionActivities);

        const lpoFirePlaceValidators = partialOrders.map(
            partialOrder => new LpoFirePlaceValidator(partialOrder)
        );

        const terminationConditionReachedFct =
            this._minerSettings.terminationCondition.toIsTerminationConditionReachedFunction();

        this._counterTestedPlacesLastRun = this._randomPlaceGenerator.init(
            petriNet,
            partialOrders
        );
        while (!terminationConditionReachedFct(petriNet)) {
            const clonedPetriNet = petriNet.clone();

            const addedPlace = this._randomPlaceGenerator.insertRandomPlace(
                'p' + this._counterTestedPlacesLastRun++,
                clonedPetriNet
            );

            if (
                !RstMiner.isGeneratedPlaceValid(
                    addedPlace,
                    clonedPetriNet,
                    lpoFirePlaceValidators
                )
            ) {
                continue;
            }

            petriNet = clonedPetriNet;
            this._counterTestedPlacesLastRun =
                this.removeImplicitPlacesForAndIncreaseCounter(
                    implicitPlaceIdentifier,
                    addedPlace,
                    petriNet,
                    this._counterTestedPlacesLastRun
                );
        }

        // TODO anders initialisieren und nutzen in der loop
        return petriNet;
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

    private removeImplicitPlacesForAndIncreaseCounter(
        implicitPlaceIdentifier: ImplicitPlaceIdentifier,
        addedPlace: Place,
        petriNet: PetriNet,
        counter: number
    ): number {
        implicitPlaceIdentifier
            .calculateImplicitPlacesFor(addedPlace, petriNet)
            .filter(implicitResult =>
                RstMiner.checkSubstitutePlacesAreValidOrUndefined(
                    implicitResult.substitutePlaces
                )
            )
            .forEach(implicitResult => {
                petriNet.removePlace(implicitResult.implicitPlace); // TODO --> Nur removen, wenn (einer) aus replacement recursiver Chain valide
                for (const substTemplatePlace of implicitResult.substitutePlaces) {
                    const substPlace = substTemplatePlace.buildPlaceWithId(
                        'p' + counter++
                    );
                    petriNet.addPlace(substPlace);
                    substPlace.ingoingArcs.forEach(arc => petriNet.addArc(arc));
                    substPlace.outgoingArcs.forEach(arc =>
                        petriNet.addArc(arc)
                    );
                    counter = this.removeImplicitPlacesForAndIncreaseCounter(
                        implicitPlaceIdentifier,
                        substPlace,
                        petriNet,
                        counter
                    );
                }
            });
        return counter;
    }

    private static checkSubstitutePlacesAreValidOrUndefined(
        // TODO ggf direkt im rST-Miner zur teilevaluation
        substitutePlaces: Array<TemplatePlace>
    ) {
        if (substitutePlaces.length == 0) {
            return true;
        }
        return true; // TODO (combined places auf max tokens, max weight, etc. validieren)
    }

    private static isGeneratedPlaceValid(
        addedPlace: Place,
        clonedPetriNet: PetriNet,
        lpoFirePlaceValidators: LpoFirePlaceValidator[]
    ) {
        for (const lpoFirePlaceValidator of lpoFirePlaceValidators) {
            const validationResultForPlaceAndOrder =
                lpoFirePlaceValidator.validate(
                    clonedPetriNet.clone(),
                    addedPlace.id!
                );
            if (!validationResultForPlaceAndOrder.valid) {
                return false;
            }
        }
        return true;
    }

    get counterTestedPlacesLastRun(): number {
        return this._counterTestedPlacesLastRun;
    }
}
