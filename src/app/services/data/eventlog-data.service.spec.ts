import { TestBed } from '@angular/core/testing';

import { EventlogDataService } from './eventlog-data.service';

describe('EventlogDataService', () => {
    let service: EventlogDataService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(EventlogDataService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
