import { PetriNet } from '../../../models/petri-net/petri-net';
import { RandomPlaceGenerator } from './random-place-generator';
import { Place } from '../../../models/petri-net/place';
import { Arc } from '../../../models/petri-net/arc';
import { PartialOrder } from '../../../models/partial-order/partial-order';

export class PrimitivePlaceGenerator implements RandomPlaceGenerator {
    constructor(
        private _maximalInitialMarking: number,
        private _ingoingConnectionProbability: number,
        private _outgoingConnectionProbability: number,
        private _maximalIngoingArcWeights: number,
        private _maximalOutgoingArcWeights: number
    ) {}

    init(petriNet: PetriNet, partialOrders: PartialOrder[]): number {
        return 0; // TODO
    }

    insertRandomPlace(id: string, petriNet: PetriNet): Place {
        const newPlace = new Place(
            Math.floor(Math.random() * (this._maximalInitialMarking + 1)),
            id
        );
        petriNet.addPlace(newPlace);

        Array.from(petriNet.getTransitions())
            .filter(
                transition => Math.random() < this._ingoingConnectionProbability
            )
            .map(
                transition =>
                    new Arc(
                        'i' + id + transition.label,
                        transition,
                        newPlace,
                        Math.floor(
                            Math.random() * this._maximalIngoingArcWeights
                        ) + 1
                    )
            )
            .forEach(arc => petriNet.addArc(arc));

        Array.from(petriNet.getTransitions())
            .filter(
                transition =>
                    Math.random() < this._outgoingConnectionProbability
            )
            .map(
                transition =>
                    new Arc(
                        'o' + id + transition.label,
                        newPlace,
                        transition,
                        Math.floor(
                            Math.random() * this._maximalOutgoingArcWeights
                        ) + 1
                    )
            )
            .forEach(arc => petriNet.addArc(arc));

        return newPlace;
    }
}
