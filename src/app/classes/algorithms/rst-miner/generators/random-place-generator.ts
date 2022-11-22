import { PetriNet } from '../../../models/petri-net/petri-net';
import { PartialOrder } from '../../../models/partial-order/partial-order';
import { Place } from '../../../models/petri-net/place';

export interface RandomPlaceGenerator {
    insertRandomPlace(id: string, petriNet: PetriNet): Place;

    init(petriNet: PetriNet, partialOrders: PartialOrder[]): number;
}
