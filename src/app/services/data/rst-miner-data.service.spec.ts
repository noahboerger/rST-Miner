import { TestBed } from '@angular/core/testing';

import { RstMinerDataService } from './rst-miner-data.service';

describe('EventlogDataService', () => {
    let service: RstMinerDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RstMinerDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
