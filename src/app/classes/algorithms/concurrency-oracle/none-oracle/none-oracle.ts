import { ConcurrencyOracle } from '../concurrency-oracle';
import { ConcurrencyRelation } from '../../../models/concurrency/concurrency-relation';
import { TraceCleaner } from '../trace-cleaner';
import { Eventlog } from '../../../models/eventlog/eventlog';

export class NoneOracle extends TraceCleaner implements ConcurrencyOracle {
    determineConcurrency(eventlog: Eventlog): ConcurrencyRelation {
        return ConcurrencyRelation.noConcurrency();
    }
}
