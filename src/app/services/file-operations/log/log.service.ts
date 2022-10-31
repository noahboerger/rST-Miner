import { Injectable } from '@angular/core';
import { EventLog } from '../../../classes/EventLog/eventlog';
import { Trace } from '../../../classes/EventLog/trace';
import { Event } from '../../../classes/EventLog/event';
import {
    BooleanAttribute,
    DateAttribute,
    EventLogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from '../../../classes/EventLog/eventlogattribute';

@Injectable({
    providedIn: 'root',
})
export class LogService {
    private readonly _caseIdElement = 'case-id';
    private readonly _activityElement = 'concept:name';
    private readonly _undefinedValue = "''";

    constructor() {}

    private static getAttributeValueAsString(
        attribute: EventLogAttribute | number | string
    ): string {
        if (typeof attribute === 'string') {
            return attribute;
        }
        if (typeof attribute === 'number') {
            return String(attribute);
        }
        if (attribute instanceof StringAttribute) {
            return attribute.value;
        }
        if (attribute instanceof DateAttribute) {
            return attribute.value.toISOString();
        }
        if (
            attribute instanceof IntAttribute ||
            attribute instanceof FloatAttribute
        ) {
            return String(attribute.value);
        }
        if (attribute instanceof BooleanAttribute) {
            return attribute.value ? 'true' : 'false';
        }
        console.error('unknown attribute type');
        return '';
    }

    /**
     * Wandelt die intern verwendete Repräsentation in ein .type log formattierten String um
     *
     * @param eventLog interne Repräsentation als {@link EventLog}
     * @return .type log formattierter String
     */
    public generate(eventLog: EventLog): string {
        if (eventLog.traces.length == 0) {
            return '';
        }
        const traces = eventLog.traces;
        let logString = '.type log' + '\n' + '.attributes' + '\n';

        const attributes = this.listOfAttributes(traces);
        logString +=
            this._caseIdElement +
            '\n' +
            this._activityElement +
            '\n' +
            attributes.join('\n') +
            '\n';

        logString += '.events' + '\n';
        logString += traces
            .map(trace =>
                this.getTraceRepresentation(trace, trace.caseId, attributes)
            )
            .join('\n');
        return logString;
    }

    private listOfAttributes(traces: Trace[]): string[] {
        const attributesWithDuplicates = traces
            .flatMap(trace => trace.events)
            .flatMap(event => event.attributes)
            .filter(attribute => attribute.key !== '' && attribute.value !== '')
            .map(attribute => attribute.key)
            .filter(
                attributeKey =>
                    ![this._activityElement, this._caseIdElement].includes(
                        attributeKey
                    )
            )
            .map(attributeString => this.escapeIfNecessary(attributeString));
        // Sort occurrences in events desc
        const attributesOccurrencesMap = attributesWithDuplicates.reduce(
            (acc, e) => acc.set(e, (acc.get(e) || 0) + 1),
            new Map<string, number>()
        );
        return [...attributesOccurrencesMap.entries()]
            .sort((a, b) => b[1] - a[1])
            .map(entry => entry[0]);
    }

    private getTraceRepresentation(
        trace: Trace,
        caseId: number,
        attributes: string[]
    ): string {
        return trace.events
            .map(event =>
                this.getEventRepresentation(event, caseId, attributes)
            )
            .join('\n');
    }

    private getEventRepresentation(
        event: Event,
        caseId: number,
        attributes: string[]
    ): string {
        const otherAttributes: any[] = attributes.map(attributeKey =>
            event.getAttribute(attributeKey)
        );
        const eventAttributes = [caseId, event.activity].concat(
            otherAttributes
        );
        const attributesAsStrings = eventAttributes.map(attribute =>
            attribute == null
                ? this._undefinedValue
                : LogService.getAttributeValueAsString(attribute)
        );

        return this.toRepresentationLine(attributesAsStrings);
    }

    private toRepresentationLine(attributesAsStrings: string[]): string {
        return attributesAsStrings.reduceRight((acc, e) => {
            if (acc === this._undefinedValue) {
                return e === this._undefinedValue
                    ? this._undefinedValue
                    : this.escapeIfNecessary(e);
            }
            return this.escapeIfNecessary(e) + ' ' + acc;
        }, this._undefinedValue);
    }

    private escapeIfNecessary(asString: string): string {
        if (asString == this._undefinedValue) {
            return this._undefinedValue;
        }
        asString = asString.replace(new RegExp("'", 'g'), "\\'");
        const containsWhitespaceF = (str: string) => /\s/.test(str);
        if (containsWhitespaceF(asString)) {
            return "'" + asString + "'";
        }
        return asString;
    }
}
