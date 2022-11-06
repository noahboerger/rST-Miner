import {PetriNet} from './petri-net';
import {EventlogTrace} from "../eventlog/eventlog-trace";

export class PartialOrderNetWithContainedTraces {
    constructor(public net: PetriNet, public containedTraces: Array<EventlogTrace>) {
    }
}
