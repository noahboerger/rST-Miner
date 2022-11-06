import { TestBed } from '@angular/core/testing';
import { LogService } from './log.service';
import { Eventlog } from '../../../classes/eventlog/eventlog';
import { Trace } from '../../../classes/eventlog/trace';
import { Event } from '../../../classes/eventlog/event';
import { StringAttribute } from '../../../classes/eventlog/eventlog-attribute';

describe('Log.ServiceService', () => {
    let service: LogService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should format internal representation as formatted log string', () => {
        const sampleExportLog = new Eventlog(
            [],
            [],
            [],
            [
                new Trace(
                    [new StringAttribute('1-147898401', 'concept:name')],
                    [
                        new Event(
                            [
                                new StringAttribute('Group 1', 'org:group'),
                                new StringAttribute('Role 1', 'org:role'),
                                new StringAttribute("Name ' 1", 'org:name'),
                                new StringAttribute(
                                    '',
                                    'ignoredAttributeEmptyValue'
                                ),
                                new StringAttribute(
                                    'ignoredAttributeEmptyKey',
                                    ''
                                ),
                            ],
                            'Baden'
                        ),
                        new Event(
                            [new StringAttribute('Group 2', 'org:group')],
                            'Schwimmen'
                        ),
                    ],
                    7
                ),
                new Trace(
                    [],
                    [
                        new Event(
                            [
                                new StringAttribute('Name 3', 'org:name'),
                                new StringAttribute('Group 3', 'org:group'),
                            ],
                            'Lesen'
                        ),
                        new Event(
                            [new StringAttribute('Other Value 4', 'org:other')],
                            'Lesen'
                        ),
                    ],
                    5
                ),
            ],
            []
        );

        const expectedResult =
            '.type log\n' +
            '.attributes\n' +
            'case-id\n' +
            'concept:name\n' +
            'org:group\n' +
            'org:name\n' +
            'org:role\n' +
            'org:other\n' +
            '.events\n' +
            "7 Baden 'Group 1' 'Name \\' 1' 'Role 1'\n" +
            "7 Schwimmen 'Group 2'\n" +
            "5 Lesen 'Group 3' 'Name 3'\n" +
            "5 Lesen '' '' '' 'Other Value 4'";

        expect(service.generate(sampleExportLog)).toEqual(expectedResult);
    });
});
