import {ConcurrencyOracle} from '../concurrency-oracle';
import {AlphaOracleConfiguration} from './alpha-oracle-configuration';
import {Relabeler} from "../../../utility/relabeler";
import {TraceCleaner} from "../trace-cleaner";
import {ConcurrencyRelation} from "../../../models/concurrency/concurrency-relation";
import {OccurenceMatrixType, OccurrenceMatrix} from "../../../models/concurrency/occurrence-matrix";
import {EventlogTrace} from "../../../models/eventlog/eventlog-trace";
import {Eventlog} from "../../../models/eventlog/eventlog";


export class AlphaOracle extends TraceCleaner implements ConcurrencyOracle {

    constructor(private config: AlphaOracleConfiguration = {}) {
        super();
    }

    determineConcurrency(eventlog: Eventlog): ConcurrencyRelation {
        const eventlogTraces = eventlog.traces;
        if (eventlogTraces.length === 0) {
            return ConcurrencyRelation.noConcurrency();
        }

        const cleanedLog = this.cleanLog(eventlogTraces);

        const relabeler = new Relabeler();
        if (!!this.config.distinguishSameLabels) {
            relabeler.uniquelyRelabelSequences(cleanedLog);
        } else {
            relabeler.relabelSequencesPreserveNonUniqueIdentities(cleanedLog);
        }

        const matrix = this.computeOccurrenceMatrix(
            cleanedLog,
            this.config.lookAheadDistance,
            this.config.distinguishSameLabels ? OccurenceMatrixType.UNIQUE : OccurenceMatrixType.WILDCARD
        );

        return ConcurrencyRelation.fromOccurrenceMatrix(matrix, relabeler);
    }

    public computeOccurrenceMatrix(log: Array<EventlogTrace>, lookAheadDistance: number = 1, matrixType: OccurenceMatrixType = OccurenceMatrixType.UNIQUE, cleanLog: boolean = false): OccurrenceMatrix {
        const matrix = new OccurrenceMatrix(matrixType);

        if (cleanLog) {
            log = this.cleanLog(log);
        }

        for (const trace of log) {
            const prefix: Array<string> = [];
            for (const step of trace.eventActivities) {
                if (prefix.length > lookAheadDistance) {
                    prefix.shift();
                }
                for (const e of prefix) {
                    matrix.add(e, step);
                }
                prefix.push(step);
            }
        }

        console.debug(matrix);

        return matrix;
    }
}
