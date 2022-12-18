import { ConcurrencyOracle } from '../concurrency-oracle';
import { ConcurrencyRelation } from '../../../models/concurrency/concurrency-relation';
import { TraceCleaner } from '../trace-cleaner';
import { Eventlog } from '../../../models/eventlog/eventlog';
import { Relabeler } from '../../../utility/relabeler';
import { NoneOracleConfiguration } from './none-oracle-configuration';

export class NoneOracle extends TraceCleaner implements ConcurrencyOracle {
    constructor(private config: NoneOracleConfiguration = {}) {
        super();
    }

    determineConcurrency(eventlog: Eventlog): ConcurrencyRelation {
        const eventlogTraces = eventlog.traces;

        if (eventlogTraces.length === 0 || !this.config.distinguishSameLabels) {
            return ConcurrencyRelation.noConcurrency();
        }

        const cleanedLog = this.cleanLog(eventlogTraces);
        const relabeler = new Relabeler();
        relabeler.uniquelyRelabelSequences(cleanedLog);
        return ConcurrencyRelation.noConcurrency(relabeler);
    }
}
