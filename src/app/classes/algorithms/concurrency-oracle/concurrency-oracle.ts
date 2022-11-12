import {EventlogTrace} from "../../models/eventlog/eventlog-trace";
import {ConcurrencyRelation} from "../../models/concurrency/concurrency-relation";
import {Eventlog} from "../../models/eventlog/eventlog";

export interface ConcurrencyOracle {
    determineConcurrency(log: Eventlog): ConcurrencyRelation;
}
