import { TestBed } from '@angular/core/testing';

import { XesParserService } from './xes-parser.service';
import { expect } from '@angular/flex-layout/_private-utils/testing';
import { Eventlog } from '../../../classes/models/eventlog/eventlog';
import { EventlogTrace } from '../../../classes/models/eventlog/eventlog-trace';
import { EventlogEvent } from '../../../classes/models/eventlog/eventlog-event';
import {
    FloatAttribute,
    StringAttribute,
} from '../../../classes/models/eventlog/eventlog-attribute';
import { EventlogClassifier } from '../../../classes/models/eventlog/eventlog-classifier';
import { MatFormField } from '@angular/material/form-field';
import { XesParser } from '../../../classes/parser/eventlog/xesParser';

describe('XesParserService', () => {
    let service: XesParserService;

    beforeEach(() => {
        TestBed.configureTestingModule({ declarations: [MatFormField] });
        service = TestBed.inject(XesParserService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should throw error on invalid xes-file', () => {
        expect(() => service.parse('INVALID')).toThrow(XesParser.PARSING_ERROR);
    });

    it('should parse empty xes-file', () => {
        expect(service.parse('<log ></log>')).toEqual(
            new Eventlog([], [], [], [], [])
        );
    });

    it('should parse simple xes-file', () => {
        const xesString =
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<log xmlns="http://some/awesome/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xes.version="1849.2016" xes.features="nested-attributes" xsi:schemaLocation="http://some/awesome/schema file:///C:/Users/noahb/Desktop/XES/xes_certification_import_logs/XES%20certification%20import%20logs/Real-life/xes.xsd">\n' +
            '   <global scope="trace">\n' +
            '      <string key="concept:name" value="UNKNOWN" />\n' +
            '   </global>\n' +
            '   <classifier name="Activity classifier" keys="concept:name lifecycle:transition" />\n' +
            '   <float key="meta_org:resource_events_standard_deviation" value="19.944">\n' +
            '      <float key="10609" value="2.538" />\n' +
            '   </float>\n' +
            '   <trace>\n' +
            '      <string key="concept:name" value="147898401" />\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Baden gehen" />\n' +
            '         <string key="org:role" value="A2_2" />\n' +
            '         <string key="ignoreEmptyValue" value="" />\n' +
            '         <string key="" value="ignoreEmptyKey" />\n' +
            '      </event>\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Schwimmen gehen" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '      </event>\n' +
            '   </trace>\n' +
            '   <trace>\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Laufen gehen" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '      </event>\n' +
            '   </trace>\n' +
            '</log>\n';

        const expected = new Eventlog(
            [
                new EventlogClassifier('Activity classifier', [
                    'concept:name',
                    'lifecycle:transition',
                ]),
            ],
            [],
            [new StringAttribute('UNKNOWN', 'concept:name')],
            [
                new EventlogTrace(
                    [new StringAttribute('147898401', 'concept:name')],
                    [
                        new EventlogEvent(
                            [new StringAttribute('A2_2', 'org:role')],
                            'Baden gehen'
                        ),
                        new EventlogEvent(
                            [new StringAttribute('Org line A2', 'org:group')],
                            'Schwimmen gehen'
                        ),
                    ],
                    147898401
                ),
                new EventlogTrace(
                    [],
                    [
                        new EventlogEvent(
                            [new StringAttribute('Org line A2', 'org:group')],
                            'Laufen gehen'
                        ),
                    ],
                    1
                ),
            ],
            [
                new FloatAttribute(
                    19.944,
                    'meta_org:resource_events_standard_deviation'
                ),
                new FloatAttribute(2.538, '10609'),
            ]
        );

        expect(service.parse(xesString)).toEqual(expected);
    });

    it('should parse complex xes-file', () => {
        const xesString =
            '<?xml version="1.0" encoding="UTF-8"?>\n' +
            '<log xmlns="http://some/awesome/schema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xes.version="1849.2016" xes.features="nested-attributes" xsi:schemaLocation="http://some/awesome/schema file:///C:/Users/noahb/Desktop/XES/xes_certification_import_logs/XES%20certification%20import%20logs/Real-life/xes.xsd">\n' +
            '  <extension name="Concept" prefix="concept" uri="http://www.xes-standard.org/concept.xesext"/>\n' +
            '  <extension name="MetaData_Concept" prefix="meta_concept" uri="http://www.xes-standard.org/meta_concept.xesext"/>\n' +
            '   <global scope="trace">\n' +
            '      <string key="concept:name" value="UNKNOWN" />\n' +
            '   </global>\n' +
            '   <global scope="event">\n' +
            '      <date key="time:timestamp" value="1970-01-01T00:00:00+01:00" />\n' +
            '      <string key="org:group" value="UNKNOWN" />\n' +
            '      <string key="org:resource" value="UNKNOWN" />\n' +
            '      <string key="concept:name" value="UNKNOWN" />\n' +
            '      <string key="impact" value="UNKNOWN" />\n' +
            '      <string key="product" value="UNKNOWN" />\n' +
            '      <string key="lifecycle:transition" value="UNKNOWN" />\n' +
            '   </global>\n' +
            '   <classifier name="Activity_classifier" keys="concept:name lifecycle:transition" />\n' +
            '   <classifier name="Activity_classifier" keys="concept:name lifecycle:transition" />\n' +
            '   <classifier name="Activity_classifier_activityNameNL" keys="activityNameNL lifecycle:transition" />\n' +
            '   <classifier name="Activity_classifier_activityNameEN" keys="activityNameEN lifecycle:transition" />\n' +
            '   <classifier name="Resource" keys="org:resource" />\n' +
            '   <float key="meta_org:resource_events_standard_deviation" value="19.944">\n' +
            '      <float key="10609" value="2.538" />\n' +
            '      <float key="10899" value="1.214" />\n' +
            '      <float key="11299" value="0.522" />\n' +
            '      <float key="10821" value="0.017" />\n' +
            '      <float key="11169" value="1.997" />\n' +
            '      <float key="10789" value="0.674" />\n' +
            '      <float key="11319" value="0.609" />\n' +
            '   </float>\n' +
            '   <int key="meta_org:role_events_total" value="262200">\n' +
            '      <int key="UNKNOWN" value="262200" />\n' +
            '   </int>\n' +
            '   <trace>\n' +
            '      <string key="concept:name" value="147898401" />\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Aktivitätswert" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '         <string key="org:role" value="A2_2" />\n' +
            '         <string key="impact" value="Medium" />\n' +
            '         <string key="product" value="PROD753" />\n' +
            '         <date key="time:timestamp" value="2006-11-07T10:00:36+01:00" />\n' +
            '         <string key="lifecycle:transition" value="In Progress" />\n' +
            '      </event>\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Aktivitätswert" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '         <string key="org:role" value="A2_2" />\n' +
            '         <string key="impact" value="Medium" />\n' +
            '         <string key="product" value="PROD753" />\n' +
            '         <date key="time:timestamp" value="2006-11-07T13:05:44+01:00" />\n' +
            '         <string key="lifecycle:transition" value="In Progress" />\n' +
            '      </event>\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Aktivitätswert" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '         <string key="org:role" value="A2_2" />\n' +
            '         <string key="impact" value="Medium" />\n' +
            '         <string key="product" value="PROD753" />\n' +
            '         <date key="time:timestamp" value="2009-12-02T14:24:32+01:00" />\n' +
            '         <string key="lifecycle:transition" value="Wait" />\n' +
            '      </event>\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Aktivitätswert" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '         <string key="org:role" value="A2_2" />\n' +
            '         <string key="impact" value="Medium" />\n' +
            '         <string key="product" value="PROD753" />\n' +
            '         <date key="time:timestamp" value="2011-09-03T07:09:09+02:00" />\n' +
            '         <string key="lifecycle:transition" value="In Progress" />\n' +
            '      </event>\n' +
            '   </trace>\n' +
            '   <trace>\n' +
            '      <string key="concept:name" value="165554831" />\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Aktivitätswert" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '         <string key="org:role" value="A2_2" />\n' +
            '         <string key="impact" value="Medium" />\n' +
            '         <string key="product" value="PROD753" />\n' +
            '         <date key="time:timestamp" value="2007-03-20T09:06:25+01:00" />\n' +
            '         <string key="lifecycle:transition" value="In Progress" />\n' +
            '      </event>\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Aktivitätswert" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '         <string key="impact" value="Medium" />\n' +
            '         <string key="product" value="PROD753" />\n' +
            '         <date key="time:timestamp" value="2009-12-02T14:24:31+01:00" />\n' +
            '         <string key="lifecycle:transition" value="Wait" />\n' +
            '      </event>\n' +
            '      <event>\n' +
            '         <string key="concept:name" value="Aktivitätswert" />\n' +
            '         <string key="org:group" value="Org line A2" />\n' +
            '         <date key="time:timestamp" value="2011-09-03T07:10:53+02:00" />\n' +
            '         <string key="lifecycle:transition" value="In Progress" />\n' +
            '      </event>\n' +
            '   </trace>\n' +
            '</log>\n';

        const result = service.parse(xesString);
        expect(result.attributes.length).toBe(10);
        expect(result.traces.length).toBe(2);
        expect(result.traces[0].events.length).toBe(4);
        expect(result.traces[1].events.length).toBe(3);
        expect(result.classifiers.length).toBe(5);
        expect(result.globalEventAttributes.length).toBe(7);
        expect(result.globalTraceAttributes.length).toBe(1);
    });
});
