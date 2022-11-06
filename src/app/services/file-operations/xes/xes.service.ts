import { Injectable } from '@angular/core';
import { Classifier } from '../../../classes/eventlog/classifier';
import { Event } from '../../../classes/eventlog/event';
import { Eventlog } from '../../../classes/eventlog/eventlog';
import {
    BooleanAttribute,
    DateAttribute,
    EventlogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from '../../../classes/eventlog/eventlog-attribute';
import { Trace } from '../../../classes/eventlog/trace';
var format = require('xml-formatter');

@Injectable({
    providedIn: 'root',
})
export class XesService {
    /**
     * Wandelt die intern verwendete Repräsentation in ein XES formattierten String um
     *
     * @param eventLog interne Repräsentation als {@link Eventlog}
     * @return XES formattierter String
     */
    public generate(eventLog: Eventlog): string {
        let xesString = '<?xml version="1.0" encoding="UTF-8" ?>';
        xesString += '<log xes.version="1.0" xes.features="">';
        xesString +=
            '<extension name="Lifecycle" prefix="lifecycle" uri="http://www.xes-standard.org/lifecycle.xesext"/>';
        xesString +=
            '<extension name="Organizational" prefix="org" uri="http://www.xes-standard.org/org.xesext"/>';
        xesString +=
            '<extension name="Time" prefix="time" uri="http://www.xes-standard.org/time.xesext"/>';
        xesString +=
            '<extension name="Concept" prefix="concept" uri="http://www.xes-standard.org/concept.xesext"/>';
        xesString +=
            '<extension name="Semantic" prefix="semantic" uri="http://www.xes-standard.org/semantic.xesext"/>';

        if (eventLog.globalTraceAttributes.length > 0) {
            xesString += '<global scope="trace">';
            eventLog.globalTraceAttributes.forEach(attribute => {
                xesString += XesService.getAttributeRepresentation(attribute);
            });
            xesString += '</global>';
        }

        if (eventLog.globalEventAttributes.length > 0) {
            xesString += '<global scope="event">';
            eventLog.globalEventAttributes.forEach(attribute => {
                xesString += XesService.getAttributeRepresentation(attribute);
            });
            xesString += '</global>';
        }

        eventLog.classifiers.forEach(classifier => {
            xesString += this.getClassifierRepresentation(classifier);
        });

        eventLog.attributes.forEach(attribute => {
            xesString += XesService.getAttributeRepresentation(attribute);
        });

        eventLog.traces.forEach(trace => {
            xesString += this.getTraceRepresentation(trace);
        });
        xesString += '</log>';
        return format(xesString);
    }

    private getClassifierRepresentation(classifier: Classifier): string {
        let classifierString = '<classifier name="' + classifier.name + '"';
        classifierString += 'keys="' + classifier.keys.join(' ') + '"/>';
        return classifierString;
    }

    private getTraceRepresentation(trace: Trace): string {
        let traceString = '<trace>';
        traceString +=
            '<string key="concept:name" value="' + trace.caseId + '" />';
        trace.attributes.forEach(attribute => {
            if (attribute.key !== 'concept:name') {
                traceString += XesService.getAttributeRepresentation(attribute);
            }
        });
        trace.events.forEach(event => {
            traceString += this.getEventRepresentation(event);
        });
        traceString += '</trace>';
        return traceString;
    }

    private getEventRepresentation(event: Event): string {
        let eventString = '<event>';
        eventString +=
            '<string key="concept:name" value="' + event.activity + '" />';
        event.attributes.forEach(attribute => {
            eventString += XesService.getAttributeRepresentation(attribute);
        });
        eventString += '</event>';
        return eventString;
    }

    private static getAttributeRepresentation(
        attribute: EventlogAttribute
    ): string {
        if (attribute instanceof StringAttribute) {
            return (
                '<string key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        if (attribute instanceof DateAttribute) {
            return (
                '<date key="' +
                attribute.key +
                '" value="' +
                attribute.value.toISOString() +
                '" />'
            );
        }
        if (attribute instanceof IntAttribute) {
            return (
                '<int key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        if (attribute instanceof FloatAttribute) {
            return (
                '<float key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        if (attribute instanceof BooleanAttribute) {
            return (
                '<boolean key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        console.error('unknown attribute type');
        return '';
    }
}
