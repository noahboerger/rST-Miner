import { expect } from '@angular/flex-layout/_private-utils/testing';
import { Lifecycle } from '../../../models/eventlog/utils/lifecycle';
import { TimestampOracle } from './timestamp-oracle';
import { createMockTrace } from '../../../utility/test/create-mock-trace';
import { Eventlog } from '../../../models/eventlog/eventlog';

describe('TimestampOracle', () => {
    it('should detect wildcard concurrency', () => {
        const service = new TimestampOracle();

        // |-A-||-B-|
        let trace = createMockTrace([
            { n: 'A', p: Lifecycle.START },
            { n: 'A', p: Lifecycle.COMPLETE },
            { n: 'B', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.COMPLETE },
        ]);

        let concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        expect(concurrency.isConcurrent('A', 'B')).toBeFalse();

        // |-A-|
        //   |-B-|
        trace = createMockTrace([
            { n: 'A', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.START },
            { n: 'A', p: Lifecycle.COMPLETE },
            { n: 'B', p: Lifecycle.COMPLETE },
        ]);

        concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        expect(concurrency.isConcurrent('A', 'B')).toBeTrue();

        // |-A-|
        //   |--B--|
        //       |-C-|
        trace = createMockTrace([
            { n: 'A', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.START },
            { n: 'A', p: Lifecycle.COMPLETE },
            { n: 'C', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.COMPLETE },
            { n: 'C', p: Lifecycle.COMPLETE },
        ]);

        concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        expect(concurrency.isConcurrent('A', 'B')).toBeTrue();
        expect(concurrency.isConcurrent('B', 'C')).toBeTrue();
        expect(concurrency.isConcurrent('A', 'C')).toBeFalse();

        // |-----A-----|
        //   |---B---|
        //     |-C-|
        trace = createMockTrace([
            { n: 'A', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.START },
            { n: 'C', p: Lifecycle.START },
            { n: 'C', p: Lifecycle.COMPLETE },
            { n: 'B', p: Lifecycle.COMPLETE },
            { n: 'A', p: Lifecycle.COMPLETE },
        ]);

        concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        expect(concurrency.isConcurrent('A', 'B')).toBeTrue();
        expect(concurrency.isConcurrent('B', 'C')).toBeTrue();
        expect(concurrency.isConcurrent('A', 'C')).toBeTrue();

        // A |-B-|
        trace = createMockTrace([
            { n: 'A', p: Lifecycle.COMPLETE },
            { n: 'B', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.COMPLETE },
        ]);

        concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        expect(concurrency.isConcurrent('A', 'B')).toBeFalse();

        // |-A-| B
        trace = createMockTrace([
            { n: 'A', p: Lifecycle.START },
            { n: 'A', p: Lifecycle.COMPLETE },
            { n: 'B', p: Lifecycle.COMPLETE },
        ]);

        concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        expect(concurrency.isConcurrent('A', 'B')).toBeFalse();

        // |-A-|
        //   B
        trace = createMockTrace([
            { n: 'A', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.COMPLETE },
            { n: 'A', p: Lifecycle.COMPLETE },
        ]);

        concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        expect(concurrency.isConcurrent('A', 'B')).toBeTrue();
    });

    it('should detect unique concurrency', () => {
        const service = new TimestampOracle({ distinguishSameLabels: true });

        // |-A-|
        //   |--B--|
        //       |-A-|
        let trace = createMockTrace([
            { n: 'A', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.START },
            { n: 'A', p: Lifecycle.COMPLETE },
            { n: 'A', p: Lifecycle.START },
            { n: 'B', p: Lifecycle.COMPLETE },
            { n: 'A', p: Lifecycle.COMPLETE },
        ]);

        let concurrency = service.determineConcurrency(
            new Eventlog([], [], [], [trace], [])
        );
        expect(concurrency).toBeTruthy();
        const aLabels = concurrency.relabeler.getLabelOrder().get('A')!;
        expect(aLabels).toBeTruthy();
        expect(aLabels.length).toBe(2);
        expect(concurrency.isConcurrent(aLabels[0], 'B')).toBeTrue();
        expect(concurrency.isConcurrent(aLabels[1], 'B')).toBeTrue();
        expect(concurrency.isConcurrent(aLabels[0], aLabels[1])).toBeFalse();
    });
});
