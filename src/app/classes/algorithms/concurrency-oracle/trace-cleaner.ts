import { EventlogTrace } from '../../models/eventlog/eventlog-trace';
import { Lifecycle } from '../../models/eventlog/utils/lifecycle';

export abstract class TraceCleaner {
    protected cleanLog(traces: Array<EventlogTrace>): Array<EventlogTrace> {
        return traces.map(t => this.cleanTrace(t));
    }

    protected cleanTrace(trace: EventlogTrace): EventlogTrace {
        const cleanedEvents = trace.events.filter(
            e => e.lifecycle === undefined || e.lifecycle === Lifecycle.COMPLETE
        );
        return new EventlogTrace(trace.attributes, cleanedEvents, trace.caseId);
    }
}
