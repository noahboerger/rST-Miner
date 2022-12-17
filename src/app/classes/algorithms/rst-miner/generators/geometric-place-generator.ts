import { PetriNet } from '../../../models/petri-net/petri-net';
import { RandomPlaceGenerator } from './random-place-generator';
import { Place } from '../../../models/petri-net/place';
import { PartialOrder } from '../../../models/partial-order/partial-order';
import { Transition } from '../../../models/petri-net/transition';
import {
    ArcType,
    buildArc,
} from '../../petri-net/transformation/classes/arc-type';

export class GeometricPlaceGenerator implements RandomPlaceGenerator {
    constructor(
        private _maximalInitialMarking: number,
        private _geometricIncreaseInitialMarkingProbability: number,
        private _geometricIncreaseArcsProbability: number,
        private _maximalIngoingArcWeight: number,
        private _maximalOutgoingArcWeight: number
    ) {}

    init(petriNet: PetriNet, partialOrders: PartialOrder[]): number {
        return 0;
    }

    insertRandomPlace(id: string, petriNet: PetriNet): Place {
        let initialMarking = 0;
        while (
            initialMarking < this._maximalInitialMarking &&
            Math.random() < this._geometricIncreaseInitialMarkingProbability
        ) {
            initialMarking += 1;
        }

        const newPlace = new Place(initialMarking, id);

        petriNet.addPlace(newPlace);

        this.addGeometricArcs(petriNet, newPlace, id);

        return newPlace;
    }

    private addGeometricArcs(petriNet: PetriNet, newPlace: Place, pId: string) {
        function addRandomArc(arcType: ArcType) {
            let remainingTransitions;
            let maxWeight;
            let transWeightMap;
            if (arcType === ArcType.INGOING) {
                remainingTransitions = incomingRemainingTransitions;
                maxWeight = maxIngoingArcWeight;
                transWeightMap = incomingTransWeightMap;
            } else {
                remainingTransitions = outgoingRemainingTransitions;
                maxWeight = maxOutgoingArcWeight;
                transWeightMap = outgoingTransWeightMap;
            }

            const randomTransition =
                remainingTransitions[
                    Math.floor(Math.random() * remainingTransitions.length)
                ];
            let newWeight = 1;
            if (transWeightMap.has(randomTransition)) {
                newWeight += transWeightMap.get(randomTransition)!;
            }
            transWeightMap.set(randomTransition, newWeight);
            if (newWeight >= maxWeight) {
                const index = remainingTransitions.indexOf(randomTransition, 0);
                remainingTransitions.splice(index, 1);
            }
        }

        const maxIngoingArcWeight = this._maximalIngoingArcWeight;
        const maxOutgoingArcWeight = this._maximalOutgoingArcWeight;
        const incomingRemainingTransitions = petriNet.getTransitions();
        const outgoingRemainingTransitions = petriNet.getTransitions();
        const incomingTransWeightMap = new Map<Transition, number>();
        const outgoingTransWeightMap = new Map<Transition, number>();

        addRandomArc(ArcType.INGOING);
        addRandomArc(ArcType.OUTGOING);

        while (
            Math.random() < this._geometricIncreaseArcsProbability &&
            (incomingRemainingTransitions.length !== 0 ||
                outgoingRemainingTransitions.length !== 0)
        ) {
            if (incomingRemainingTransitions.length === 0) {
                addRandomArc(ArcType.OUTGOING);
            } else if (outgoingRemainingTransitions.length === 0) {
                addRandomArc(ArcType.INGOING);
            } else {
                if (Math.random() < 0.5) {
                    addRandomArc(ArcType.INGOING);
                } else {
                    addRandomArc(ArcType.OUTGOING);
                }
            }
        }

        incomingTransWeightMap.forEach((weight, transition) => {
            const newArc = buildArc(
                ArcType.INGOING,
                newPlace,
                pId,
                transition,
                weight
            );
            petriNet.addArc(newArc);
        });
        outgoingTransWeightMap.forEach((weight, transition) => {
            const newArc = buildArc(
                ArcType.OUTGOING,
                newPlace,
                pId,
                transition,
                weight
            );
            petriNet.addArc(newArc);
        });
    }
}
