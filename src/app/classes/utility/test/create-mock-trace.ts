import { EventlogTrace } from '../../models/eventlog/eventlog-trace';
import { EventlogEvent } from '../../models/eventlog/eventlog-event';
import { Lifecycle } from '../../models/eventlog/utils/lifecycle';

export function createMockTrace(
    events: Array<{ n: string; p?: Lifecycle }>
): EventlogTrace {
    const traceEvents = events.map(e => new EventlogEvent([], e.n, e.p));
    return new EventlogTrace([], traceEvents, 0);
}
