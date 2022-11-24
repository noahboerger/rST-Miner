import { PetriNet } from '../../../models/petri-net/petri-net';
import { RandomPlaceGenerator } from './random-place-generator';
import { Place } from '../../../models/petri-net/place';
import { Arc } from '../../../models/petri-net/arc';
import { PartialOrder } from '../../../models/partial-order/partial-order';

export class PrimitivePlaceGenerator implements RandomPlaceGenerator {
    constructor(private _probability: number) {}

    init(petriNet: PetriNet, partialOrders: PartialOrder[]): number {
        return 0; // TODO
    }

    insertRandomPlace(id: string, petriNet: PetriNet): Place {
        const newPlace = new Place(Math.random() < 0.5 ? 0 : 1, id); // TODO generate marking
        petriNet.addPlace(newPlace);

        // Array.from(petriNet.getTransitions())
        //     .filter(transition => Math.random() < this._probability)
        //     .map(transition => new Arc("i" + id + transition.label, transition, newPlace))
        //     .forEach(arc => petriNet.addArc(arc));
        //
        //
        // Array.from(petriNet.getTransitions())
        //     .filter(transition => Math.random() < this._probability)
        //     .map(transition => new Arc("o" + id + transition.label, newPlace, transition))
        //     .forEach(arc => petriNet.addArc(arc));

        Array.from(petriNet.getTransitions()) // TODO generiert erstmal keine short loops
            .filter(transition => Math.random() < this._probability)
            .map(transition =>
                Math.random() > 0.5
                    ? new Arc('i' + id + transition.label, transition, newPlace)
                    : new Arc('o' + id + transition.label, newPlace, transition)
            )
            .forEach(arc => petriNet.addArc(arc));

        return newPlace;
    }
}
