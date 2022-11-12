import {PartialOrderEvent} from "../../../../models/partial-order/partial-order-event";

export class IsomorphismCandidate {
    constructor(public target: PartialOrderEvent, public candidates: Array<PartialOrderEvent>) {
    }
}
