import {ConcurrencyOracle} from '../concurrency-oracle';
import {TimestampOracleConfiguration} from './timestamp-oracle-configuration';
import {EventlogTrace} from "../../../models/eventlog/eventlog-trace";
import {ConcurrencyRelation} from "../../../models/concurrency/concurrency-relation";
import {OccurenceMatrixType, OccurrenceMatrix} from "../../../models/concurrency/occurrence-matrix";
import {TraceCleaner} from "../trace-cleaner";
import {Lifecycle} from "../../../models/eventlog/utils/lifecycle";
import {Relabeler} from "../../../utility/relabeler";
import {EventlogEvent} from "../../../models/eventlog/eventlog-event";
import {Eventlog} from "../../../models/eventlog/eventlog";


export class TimestampOracle extends TraceCleaner implements ConcurrencyOracle {

    constructor(private config: TimestampOracleConfiguration = {}) {
        super();
    }

    determineConcurrency(eventlog: Eventlog): ConcurrencyRelation {
        const eventlogTraces = eventlog.traces;
        if (eventlogTraces.length === 0) {
            return ConcurrencyRelation.noConcurrency();
        }

        eventlogTraces.forEach(t => {
            this.filterTraceAndPairStartCompleteEvents(t);
        })

        const relabeler = new Relabeler();
        if (this.config.distinguishSameLabels) {
            this.relabelPairedLog(eventlogTraces, relabeler);
        } else {
            relabeler.relabelSequencesPreserveNonUniqueIdentities(eventlogTraces);
        }

        const matrix = this.constructOccurrenceMatrix(eventlogTraces, !!this.config.distinguishSameLabels);
        return ConcurrencyRelation.fromOccurrenceMatrix(matrix, relabeler);
    }

    protected filterTraceAndPairStartCompleteEvents(trace: EventlogTrace) {
        const startedEvents = new Map<string, EventlogEvent>();

        for (const e of trace.events) {
            switch (e.lifecycle) {
                case Lifecycle.START:
                    if (startedEvents.has(e.activity)) {
                        throw new Error('TimestampOracle does not currently support auto-concurrency in the log!');
                    }
                    startedEvents.set(e.activity, e);
                    break;
                case Lifecycle.COMPLETE:
                    if (startedEvents.has(e.activity)) {
                        const pair = startedEvents.get(e.activity)!;
                        e.setPairEvent(pair);
                        pair.setPairEvent(e);
                        startedEvents.delete(e.activity);
                    }
                    break;
            }
        }

        if (startedEvents.size > 0) {
            // unpaired start events exist
            const unpaired = Array.from(startedEvents.values());
            trace.events = trace.events.filter(e => !unpaired.includes(e));
        }
    }

    protected relabelPairedLog(log: Array<EventlogTrace>, relabeler: Relabeler) {
        const filteredLog = this.cleanLog(log);
        relabeler.uniquelyRelabelSequences(filteredLog);
        for (const trace of filteredLog) {
            for (const event of trace.events) {
                const pair = event.getPairEvent();
                if (pair !== undefined) {
                    pair.activity = event.activity;
                }
            }
        }
    }

    protected constructOccurrenceMatrix(log: Array<EventlogTrace>, unique: boolean): OccurrenceMatrix {
        const matrix = new OccurrenceMatrix(unique ? OccurenceMatrixType.UNIQUE : OccurenceMatrixType.WILDCARD);

        for (const trace of log) {
            const startedEvents = new Set<string>();
            for (const event of trace.events) {
                switch (event.lifecycle) {
                    case Lifecycle.START:
                        this.addAllInProgressToMatrix(event.activity, startedEvents, matrix);
                        startedEvents.add(event.activity);
                        break;
                    case Lifecycle.COMPLETE:
                        if (startedEvents.has(event.activity)) {
                            startedEvents.delete(event.activity);
                        } else {
                            // standalone
                            this.addAllInProgressToMatrix(event.activity, startedEvents, matrix);
                        }
                        break;
                }
            }
        }

        return matrix;
    }

    protected addAllInProgressToMatrix(started: string, inProgress: Set<string>, matrix: OccurrenceMatrix): void {
        for (const progress of inProgress) {
            matrix.add(started, progress);
            matrix.add(progress, started);
        }
    }
}
