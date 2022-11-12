import {EventlogTrace} from "../../models/eventlog/eventlog-trace";
import {Lifecycle} from "../../models/eventlog/utils/lifecycle";

export abstract class LogCleaner {
    protected cleanLog(log: Array<EventlogTrace>): Array<EventlogTrace> {
        return log.map(t => this.cleanTrace(t));
    }

    protected cleanTrace(trace: EventlogTrace): EventlogTrace {
        const cleanedEvents = trace.events.filter(e => e.lifecycle === undefined || e.lifecycle === Lifecycle.COMPLETE);
        return new EventlogTrace(trace.attributes, cleanedEvents, trace.caseId);
    }
}
