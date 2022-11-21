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

        let addedPlaces =  this._randomPlaceGenerator.init(petriNet, partialOrders);
        while (!terminationConditionReachedFct(petriNet)) {

            const clonedPetriNet = petriNet.clone();


            const addedPlace = this._randomPlaceGenerator.insertRandomPlace("p" + addedPlaces, clonedPetriNet);

            // TODO hauptalgorithmus mit würfeln Testen und optimieren

             // TODO ACHTUNG: Besser keine unverbundenen Plätze einfügen<

            // const t1 = new Transition("test", undefined, undefined, "t1"); TODO delete this example net
            // const p1 = new Place(undefined, undefined, undefined, "p1");
            // const p2 = new Place(undefined, undefined, undefined, "p2");
            // const arc1 = new Arc("arc1", p1, t1);
            // const arc2 = new Arc("arc2", t1, p2);
            // petriNet.addTransition(t1);
            // petriNet.addPlace(p1);
            // petriNet.addPlace(p2);
            // petriNet.addArc(arc1);
            // petriNet.addArc(arc2);
            const validationResults = partialOrders
                .flatMap(partialOrder => new LpoFireValidator(clonedPetriNet.clone(), partialOrder.clone()).validate()) // TODO -> Achtung verändert
            if(validationResults
                .filter(validationResult => !validationResult.valid)
                .length >= 1) { // TODO anpassen mit filter für noise reduction
                continue;
            }


            petriNet = clonedPetriNet
            addedPlaces++;

            this.removeImplicitPlacesFor(implicitPlaceIdentifier, addedPlace, petriNet);
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
            .map(activity => new Transition(activity, undefined, undefined, activity));

        const petriNet = new PetriNet();

        allTransitions.forEach(transition => {
            petriNet.addTransition(transition);
        });

        return petriNet;
    }

    private removeImplicitPlacesFor(implicitPlaceIdentifier: ImplicitPlaceIdentifier, addedPlace: Place, petriNet: PetriNet) {
        implicitPlaceIdentifier.calculateImplicitPlacesFor(addedPlace, petriNet)
            .filter(implicitResult => this.checkValidPlaceOrUndefined(implicitResult.substitutePlace))
            .forEach(implicitResult => {
                petriNet.removePlace(implicitResult.implicitPlace);
                const substPlace = implicitResult.substitutePlace;
                if (substPlace != null) {
                    petriNet.addPlace(substPlace);
                    substPlace.ingoingArcs.forEach(arc => petriNet.addArc(arc))
                    substPlace.outgoingArcs.forEach(arc => petriNet.addArc(arc))
                    this.removeImplicitPlacesFor(implicitPlaceIdentifier, substPlace, petriNet)
                }
            })
    }

    private checkValidPlaceOrUndefined(substitutePlace: Place | undefined) {
        if(substitutePlace == null) {
            return true;
        }
        return true; // TODO (combined place auf max tokens, max weight, etc. validieren)
    }
}
