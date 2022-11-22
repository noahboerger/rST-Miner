import {PetriNet} from "../../models/petri-net/petri-net";
import {RstMinerSettings} from "../../models/miner-settings/rst-miner-settings";
import {Eventlog} from "../../models/eventlog/eventlog";
import {LogToPartialOrderTransformer} from "../concurrency-oracle/log-to-partial-order-transformer";
import {PetriNetIsomorphismTester} from "../petri-net/isomorphism/petri-net-isomorphism-tester";
import {PetriNetToPartialOrderTransformer} from "../transformation/petri-net-to-partial-order-transformer";
import {PartialOrderIsomorphismTester} from "../partial-order/isomorphism/partial-order-isomorphism-tester";
import {ConcurrencyOracle} from "../concurrency-oracle/concurrency-oracle";
import {PartialOrderNetWithContainedTraces} from "../../models/petri-net/partial-order-net-with-contained-traces";
import {Transition} from "../../models/petri-net/transition";
import {LpoFireValidator} from "../petri-net/validation/lpo-fire-validator";
import {RandomPlaceGenerator} from "./generators/random-place-generator";
import {ImplicitPlaceIdentifier} from "../petri-net/transformation/implicit-place-identifier";
import {Place} from "../../models/petri-net/place";
import {TemplatePlace} from "../petri-net/transformation/classes/template-place";

export class RstMiner {

    /*
    TODO s:
    - Anpassung der Labels
    - Code Cleanup
    - Merge
    - Short-Loop-Support
     */

    public static MINING_ERROR = new Error(
        'given .type log string can not be parsed'
    );

    private _concurrencyOracle: ConcurrencyOracle;
    private _logToPartialOrderTransformer: LogToPartialOrderTransformer;
    private _petriNetToPartialOrderTransformer : PetriNetToPartialOrderTransformer;
    private _randomPlaceGenerator: RandomPlaceGenerator;


    constructor(private _minerSettings: RstMinerSettings) {
        this._concurrencyOracle = _minerSettings.concurrencyOracle.generateConcurrencyOracle();
        // TODO DI
        this._petriNetToPartialOrderTransformer = new PetriNetToPartialOrderTransformer();
        this._logToPartialOrderTransformer = new LogToPartialOrderTransformer(new PetriNetIsomorphismTester(new PetriNetToPartialOrderTransformer(), new PartialOrderIsomorphismTester()), _minerSettings.partialOrderTransformation.toConfig()); // TODO config
        this._randomPlaceGenerator = _minerSettings.randomPlaceGenerator.buildRandomPlaceGenerator();
    }


    public mine(eventlog: Eventlog): PetriNet {

        const concurrencyRelation = this._concurrencyOracle.determineConcurrency(eventlog);
        const partialOrderNetsWithContainedTraces = this._logToPartialOrderTransformer.transformToPartialOrders(eventlog, concurrencyRelation) // TODO --> Supports additional Config (Packen in Constructor?)
        const partialOrders = partialOrderNetsWithContainedTraces
            .map(partialOrderNetWithContainedTraces => partialOrderNetWithContainedTraces.net)
            .map(partialOrderNet => this._petriNetToPartialOrderTransformer.transform(partialOrderNet))

        const allTransitionActivities = RstMiner.calculateTransitionActivities(partialOrderNetsWithContainedTraces); // TODO nutzen für implicit place remover
        const implicitPlaceIdentifier = new ImplicitPlaceIdentifier([...allTransitionActivities], partialOrderNetsWithContainedTraces.flatMap(partialOrderNetsWithContainedTraces => partialOrderNetsWithContainedTraces.containedTraces))

        let petriNet = this.createFlowerModel(allTransitionActivities);

        const terminationConditionReachedFct = this._minerSettings.terminationCondition.toIsTerminationConditionReachedFunction();

        let counterTestedPlaces =  this._randomPlaceGenerator.init(petriNet, partialOrders);
        while (!terminationConditionReachedFct(petriNet)) {

            const clonedPetriNet = petriNet.clone();


            const addedPlace = this._randomPlaceGenerator.insertRandomPlace("p" + counterTestedPlaces++, clonedPetriNet);

            // TODO hauptalgorithmus mit würfeln Testen und optimieren

            const validationResults = partialOrders
                .flatMap(partialOrder => new LpoFireValidator(clonedPetriNet.clone(), partialOrder.clone()).validate()) // TODO -> Achtung verändert
            if(validationResults
                .filter(validationResult => !validationResult.valid)
                .length >= 1) { // TODO anpassen mit filter für noise reduction
                continue;
            }


            petriNet = clonedPetriNet
            counterTestedPlaces = this.removeImplicitPlacesForAndIncreaseCounter(implicitPlaceIdentifier, addedPlace, petriNet, counterTestedPlaces);
        }

        // TODO anders initialisieren und nutzen in der loop
        return petriNet;
    }

    private static calculateTransitionActivities(partialOrders: Array<PartialOrderNetWithContainedTraces>) : Set<string> {
        return new Set(partialOrders
            .flatMap(value => value.net.getTransitions())
            .map(transition => transition.label)
            .filter(transitionActivity => transitionActivity != null)
            .map(transitionActivity => transitionActivity!));
    }

    private createFlowerModel(transitionActivities: Set<string>) : PetriNet {

        const allTransitions = [...transitionActivities]
            .map(activity => new Transition(activity, activity));

        const petriNet = new PetriNet();

        allTransitions.forEach(transition => {
            petriNet.addTransition(transition);
        });

        return petriNet;
    }

    private removeImplicitPlacesForAndIncreaseCounter(implicitPlaceIdentifier: ImplicitPlaceIdentifier, addedPlace: Place, petriNet: PetriNet, counter: number) : number {
        implicitPlaceIdentifier.calculateImplicitPlacesFor(addedPlace, petriNet)
            .filter(implicitResult => RstMiner.checkValidPlaceOrUndefined(implicitResult.substitutePlace))
            .forEach(implicitResult => {
                petriNet.removePlace(implicitResult.implicitPlace); // TODO --> Nur removen, wenn (einer) aus replacement recursiver Chain valide
                const substTemplatePlace = implicitResult.substitutePlace;
                if (substTemplatePlace != null) {
                    const substPlace = substTemplatePlace.buildPlaceWithId("p" + counter++)
                    petriNet.addPlace(substPlace);
                    substPlace.ingoingArcs.forEach(arc => petriNet.addArc(arc))
                    substPlace.outgoingArcs.forEach(arc => petriNet.addArc(arc))
                    counter = this.removeImplicitPlacesForAndIncreaseCounter(implicitPlaceIdentifier, substPlace, petriNet, counter)
                }
            })
        return counter;
    }

    private static checkValidPlaceOrUndefined(substitutePlace: TemplatePlace | undefined) { // TODO potentiell mehrfach abziehbar
        if(substitutePlace == null) {
            return true;
        }
        return true; // TODO (combined place auf max tokens, max weight, etc. validieren)
    }
}
