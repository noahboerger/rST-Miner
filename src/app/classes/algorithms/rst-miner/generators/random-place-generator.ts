import {PetriNet} from "../../../models/petri-net/petri-net";
import {Transition} from "../../../models/petri-net/transition";
import {PartialOrder} from "../../../models/partial-order/partial-order";

export interface RandomPlaceGenerator {
    insertRandomPlace(id: string, petriNet: PetriNet, activityToTransition: Map<string, Transition>): void;

    init(petriNet: PetriNet, partialOrders: PartialOrder[]) : number;
}
