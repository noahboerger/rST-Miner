import {TestBed} from '@angular/core/testing';
import {expect} from '@angular/flex-layout/_private-utils/testing';
import {Lifecycle} from "../../../models/eventlog/utils/lifecycle";
import {NoneOracle} from "./none-oracle";
import {createMockTrace} from "../../../utility/test/create-mock-trace";
import {Eventlog} from "../../../models/eventlog/eventlog";


describe('NoneOracle', () => {
    let service: NoneOracle;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = new NoneOracle();
    });


    it('should create no-op concurrency', () => { // TODO should do anything
        // |-A-|
        //   |--B--|
        //       |-A-|
        let trace = createMockTrace([
            {n: 'A', p: Lifecycle.START},
            {n: 'B', p: Lifecycle.START},
            {n: 'A', p: Lifecycle.COMPLETE},
            {n: 'A', p: Lifecycle.START},
            {n: 'B', p: Lifecycle.COMPLETE},
            {n: 'A', p: Lifecycle.COMPLETE}
        ]);

        let concurrency = service.determineConcurrency(new Eventlog([], [], [], [trace], []));
        expect(concurrency).toBeTruthy();

        expect(concurrency.isConcurrent('A', 'A')).toBeFalse();
        expect(concurrency.isConcurrent('A', 'B')).toBeFalse();
        expect(concurrency.isConcurrent('B', 'A')).toBeFalse();
        expect(concurrency.isConcurrent('B', 'B')).toBeFalse();
    });

});
