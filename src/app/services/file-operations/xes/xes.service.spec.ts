import { TestBed } from '@angular/core/testing';
import { XesService } from './xes.service';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import {
    BooleanAttribute,
    DateAttribute,
    EventLogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from '../../../classes/EventLog/eventlogattribute';
import { Event } from '../../../classes/EventLog/event';
import { EventLog } from '../../../classes/EventLog/eventlog';
import { Trace } from '../../../classes/EventLog/trace';
import { MatFormField } from '@angular/material/form-field';
var format = require('xml-formatter');

class RandomAttribute extends EventLogAttribute {
    constructor(key: string) {
        super();
        this.key = key;
    }

    value: any;
}

describe('XesService', () => {
    let service: XesService;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [MatFormField] });
        service = TestBed.inject(XesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should export internal representation as formatted xes string', () => {
        let event_log = new EventLog(
            [],
            [],
            [],
            [
                new Trace(
                    [],
                    [
                        new Event(
                            [
                                new BooleanAttribute(true, 'booleanValue'),
                                new IntAttribute(1, 'intValue'),
                                new FloatAttribute(1.3, 'floatValue'),
                                new DateAttribute(
                                    new Date('2020-01-31T12:34:56Z'),
                                    'dateValue'
                                ),
                                new StringAttribute('basadf', 'stringValue'),
                            ],
                            'Auto'
                        ),
                    ],
                    1
                ),
            ],
            []
        );

        let expected_string = format(
            '<?xml version="1.0" encoding="UTF-8" ?>' +
                '<log xes.version="1.0" xes.features="">' +
                '<extension name="Lifecycle" prefix="lifecycle" uri="http://www.xes-standard.org/lifecycle.xesext"/>' +
                '<extension name="Organizational" prefix="org" uri="http://www.xes-standard.org/org.xesext"/>' +
                '<extension name="Time" prefix="time" uri="http://www.xes-standard.org/time.xesext"/>' +
                '<extension name="Concept" prefix="concept" uri="http://www.xes-standard.org/concept.xesext"/>' +
                '<extension name="Semantic" prefix="semantic" uri="http://www.xes-standard.org/semantic.xesext"/>' +
                '<trace>' +
                '<string key="concept:name" value="1" />' +
                '<event>' +
                '<string key="concept:name" value="Auto" />' +
                '<boolean key="booleanValue" value="true" />' +
                '<int key="intValue" value="1" />' +
                '<float key="floatValue" value="1.3" />' +
                '<date key="dateValue" value="2020-01-31T12:34:56.000Z" />' +
                '<string key="stringValue" value="basadf" />' +
                '</event>' +
                '</trace>' +
                '</log>'
        );

        expect(service.generate(event_log)).toEqual(expected_string);
    });

    it('should print error to console with unknown EventLogAttribute', () => {
        let event_log = new EventLog(
            [],
            [],
            [],
            [
                new Trace(
                    [],
                    [new Event([new RandomAttribute('do not exist!')], 'Auto')],
                    1
                ),
            ],
            []
        );
        spyOn(console, 'error');
        service.generate(event_log);
        expect(console.error).toHaveBeenCalled();
    });
});
