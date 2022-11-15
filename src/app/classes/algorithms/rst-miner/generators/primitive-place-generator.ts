import {PetriNet} from "../../../models/petri-net/petri-net";
import {RandomPlaceGenerator} from "./random-place-generator";
import {Transition} from "../../../models/petri-net/transition";
import {Place} from "../../../models/petri-net/place";
import {Arc} from "../../../models/petri-net/arc";
import {PartialOrder} from "../../../models/partial-order/partial-order";

export class PrimitivePlaceGenerator implements RandomPlaceGenerator {

    constructor(private _probability: number) {
    }

    init(petriNet: PetriNet, partialOrders: PartialOrder[]) :number{
        return 0; // TODO
    }

    insertRandomPlace(id: string, petriNet: PetriNet, activityToTransition: Map<string, Transition>): void {
        const newPlace = new Place(Math.random() < 0.5? 0 : 1, undefined, undefined, id); // TODO generate marking
        petriNet.addPlace(newPlace);

        // TODO aktuell werden "dumm" Transitionen eingefügt die ggf nie genutzt werden aber trotzdem validiert

        // Add random ingoing arcs TODO zu dumm (nur hinzufügen, wenn eine Folgebeziehung hierfür existiert)
        Array.from(activityToTransition.keys())
            .filter(activity => Math.random() < this._probability)
            .filter(activity => activityToTransition.has(activity))
            .map(activity => new Arc("i" + id + activity, (activityToTransition.get(activity) as Transition), newPlace))
            .forEach(arc => petriNet.addArc(arc));

        // Add random outgoing arcs TODO zu dumm (nur hinzufügen, wenn eine Folgebeziehung hierfür existiert)
        Array.from(activityToTransition.keys())
            .filter(value => Math.random() < this._probability)
            .filter(activity => activityToTransition.has(activity))
            .map(activity => new Arc("o" + id + activity, newPlace, (activityToTransition.get(activity) as Transition)))
            .forEach(arc => petriNet.addArc(arc));


        // TODO auch beziehungen zwischen den plätzen genieren?! (pseudo Transitionen einführen?) --> Not supported
    }
}
