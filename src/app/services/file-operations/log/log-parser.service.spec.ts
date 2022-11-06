import { TestBed } from '@angular/core/testing';
import { LogParserService } from './log-parser.service';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { Event } from '../../../classes/eventlog/event';
import {
    BooleanAttribute,
    DateAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from '../../../classes/eventlog/eventlog-attribute';
import { Trace } from '../../../classes/eventlog/trace';
import { Eventlog } from '../../../classes/eventlog/eventlog';
import { LogParser } from '../../../classes/parser/logParser';

describe('LogParserService', () => {
    let service: LogParserService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [],
        });
        service = TestBed.inject(LogParserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should parse .type log file', () => {
        const testLogText =
            '.type log\n' +
            '.attributes\n' +
            'case-id\n' +
            'concept:name\n' +
            'booleanValue\n' +
            'intValue\n' +
            'floatValue\n' +
            'dateValue\n' +
            'stringValue\n' +
            '.events\n' +
            '1 Auto true 1 1.3 2020-01-31 basadf\n' +
            '1 Schiff true 2 2.3 2020-01-31 dasf\n' +
            '2 Bus false 4 6.7 2020-01-25 adfd';

        const expectedTraces = [
            new Trace(
                [],
                [
                    new Event(
                        [
                            new BooleanAttribute(true, 'booleanValue'),
                            new IntAttribute(1, 'intValue'),
                            new FloatAttribute(1.3, 'floatValue'),
                            new DateAttribute(
                                new Date('2020-01-31'),
                                'dateValue'
                            ),
                            new StringAttribute('basadf', 'stringValue'),
                        ],
                        'Auto'
                    ),
                    new Event(
                        [
                            new BooleanAttribute(true, 'booleanValue'),
                            new IntAttribute(2, 'intValue'),
                            new FloatAttribute(2.3, 'floatValue'),
                            new DateAttribute(
                                new Date('2020-01-31'),
                                'dateValue'
                            ),
                            new StringAttribute('dasf', 'stringValue'),
                        ],
                        'Schiff'
                    ),
                ],
                1
            ),
            new Trace(
                [],
                [
                    new Event(
                        [
                            new BooleanAttribute(false, 'booleanValue'),
                            new IntAttribute(4, 'intValue'),
                            new FloatAttribute(6.7, 'floatValue'),
                            new DateAttribute(
                                new Date('2020-01-25'),
                                'dateValue'
                            ),
                            new StringAttribute('adfd', 'stringValue'),
                        ],
                        'Bus'
                    ),
                ],
                2
            ),
        ];

        expect(service.parse(testLogText)).toEqual(
            new Eventlog([], [], [], expectedTraces, [])
        );
    });

    it('should parse .type log file with escaped values', () => {
        const testLogText =
            '.type log\n' +
            '.attributes\n' +
            'case-id\n' +
            'concept:name\n' +
            'string key\n' +
            'other string key\n' +
            '.events\n' +
            "1 'Bus \\' fahren' 'string value'\n" +
            "1 'Kart fahren' '' otherstring\\'value";

        const expectedTraces = [
            new Trace(
                [],
                [
                    new Event(
                        [new StringAttribute('string value', 'string key')],
                        "Bus ' fahren"
                    ),
                    new Event(
                        [
                            new StringAttribute(
                                "otherstring'value",
                                'other string key'
                            ),
                        ],
                        'Kart fahren'
                    ),
                ],
                1
            ),
        ];

        expect(service.parse(testLogText)).toEqual(
            new Eventlog([], [], [], expectedTraces, [])
        );
    });

    it('should throw parsing error on invalid file', () => {
        expect(() => service.parse('INVALID')).toThrow(LogParser.PARSING_ERROR);
    });
});
