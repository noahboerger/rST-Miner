import { Eventlog } from '../../models/eventlog/eventlog';
import * as xml2js from 'xml2js';
import { EventlogClassifier } from '../../models/eventlog/eventlog-classifier';
import {
    BooleanAttribute,
    DateAttribute,
    EventlogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from '../../models/eventlog/eventlog-attribute';
import { EventlogTrace } from '../../models/eventlog/eventlog-trace';
import { EventlogEvent } from '../../models/eventlog/eventlog-event';
import { Lifecycle } from '../../models/eventlog/utils/lifecycle';

export class XesParser {
    public static PARSING_ERROR = new Error(
        'given xes string can not be parsed'
    );

    private readonly _logToken = 'LOG';
    private readonly _attributesToken = '$';
    private readonly _extensionToken = 'EXTENSION';
    private readonly _classifierToken = 'CLASSIFIER';
    private readonly _globalToken = 'GLOBAL';
    private readonly _traceToken = 'TRACE';
    private readonly _eventToken = 'EVENT';
    private readonly _scopeToken = 'SCOPE';
    private readonly _stringAttributeToken = 'STRING';
    private readonly _dateAttributeToken = 'DATE';
    private readonly _intAttributeToken = 'INT';
    private readonly _floatAttributeToken = 'FLOAT';
    private readonly _booleanAttributeToken = 'BOOLEAN';
    private readonly _nameToken = 'NAME';
    private readonly _keysToken = 'KEYS';
    private readonly _keyToken = 'KEY';
    private readonly _valueToken = 'VALUE';
    private readonly _activityEventLogAttributeKey = 'concept:name';
    private readonly _lifecycleEventLogAttributeKey = 'lifecycle:transition';
    private readonly _eventScopeValue = 'event';
    private readonly _traceScopeValue = 'trace';

    private readonly _allXesElements = [
        this._stringAttributeToken,
        this._dateAttributeToken,
        this._intAttributeToken,
        this._floatAttributeToken,
        this._booleanAttributeToken,
    ];

    /**
     * Liest einen String im Xes-Format ein und wandelt es in dieintern verwendete Repräsentation als {@link Eventlog} um
     *
     * @param xmlString String im Xes-Format, der geparst werden soll
     * @return interne Darstellung als {@link Eventlog}
     */
    public parse(xmlString: string): Eventlog {
        const parser = new xml2js.Parser({ strict: false, trim: true });
        let parsedXmlObj = undefined;

        parser.parseString(xmlString, (err: Error | null, result: any) => {
            if (err == null) {
                parsedXmlObj = result;
            } else {
                throw XesParser.PARSING_ERROR;
            }
        });

        if (parsedXmlObj == null) {
            throw XesParser.PARSING_ERROR;
        }
        try {
            return this.convertToEventLog(parsedXmlObj);
        } catch (e) {
            throw XesParser.PARSING_ERROR;
        }
    }

    private convertToEventLog(result: any): Eventlog {
        if (result == null || result[this._logToken] == null) {
            return new Eventlog([], [], [], [], []);
        }
        const logObj = result[this._logToken];
        const logElements = this.readElementsOfAttribute(logObj);
        const extensions = this.convertToExtensions(
            logObj[this._extensionToken]
        );
        if (logElements == null || extensions == null) {
            throw XesParser.PARSING_ERROR;
        }
        const classifiers = this.convertToClassifiers(
            logObj[this._classifierToken]
        );
        const globalAttributes = logObj[this._globalToken];
        const globalEventAttributes = this.convertToGlobalAttributes(
            this._eventScopeValue,
            globalAttributes
        );
        const globalTraceAttributes = this.convertToGlobalAttributes(
            this._traceScopeValue,
            globalAttributes
        );

        const traces = this.convertToTraces(logObj[this._traceToken]);

        const logAttributes = this.extractEventLogAttributes(logObj);

        return new Eventlog(
            classifiers,
            globalEventAttributes,
            globalTraceAttributes,
            traces,
            logAttributes
        );
    }

    private readElementsOfAttribute(objWithAttributes: any): Map<string, any> {
        const attributeToValueMap: Map<string, any> = new Map();
        const attributesObj = objWithAttributes[this._attributesToken];
        if (attributesObj != null) {
            Object.entries(attributesObj)
                .filter(value => value.length == 2)
                .forEach(attribute =>
                    attributeToValueMap.set(attribute[0], attribute[1])
                );
        }
        return attributeToValueMap;
    }

    private convertToExtensions(extensionsObj: any): Map<string, string> {
        if (extensionsObj == null) {
            return new Map<string, string>();
        }
        return extensionsObj.map((extensionsObj: any) =>
            this.readElementsOfAttribute(extensionsObj)
        );
    }

    private convertToClassifiers(classifiersObj: any): EventlogClassifier[] {
        if (classifiersObj == null) {
            return [];
        }
        return classifiersObj
            .map((classifierObj: any) =>
                this.readElementsOfAttribute(classifierObj)
            )
            .map(
                (elementsMap: any) =>
                    new EventlogClassifier(
                        elementsMap.get(this._nameToken),
                        elementsMap.get(this._keysToken).split(' ')
                    )
            );
    }

    private convertToGlobalAttributes(
        scope: string,
        globalAttributes: any
    ): EventlogAttribute[] {
        if (globalAttributes == null) {
            return [];
        }
        const result = globalAttributes
            .filter(
                (scopedAttributes: any) =>
                    this.readElementsOfAttribute(scopedAttributes).get(
                        this._scopeToken
                    ) === scope
            )
            .map((scopedAttributes: any) =>
                this.extractEventLogAttributes(scopedAttributes)
            )[0];
        return result != null ? result : [];
    }

    private convertToTraces(tracesObj: any): EventlogTrace[] {
        if (tracesObj == null) {
            return [];
        }
        return tracesObj
            .map((traceObj: any, caseId: number) =>
                this.convertToTrace(traceObj, caseId)
            )
            .filter((trace: EventlogTrace | undefined) => trace != null);
    }

    convertToTrace(traceObj: any, caseId: number): EventlogTrace | undefined {
        if (traceObj == null) {
            return undefined;
        }
        const attributes = this.extractEventLogAttributes(traceObj);
        const extractedCaseId = XesParser.extractCaseId(attributes);
        const events: EventlogEvent[] = this.convertToEvents(
            traceObj[this._eventToken]
        );
        return new EventlogTrace(
            attributes,
            events,
            extractedCaseId ? extractedCaseId : caseId
        );
    }

    private convertToEvents(eventsObj: any): EventlogEvent[] {
        if (eventsObj == null) {
            return [];
        }
        return eventsObj
            .map((eventObj: any) => this.convertToEvent(eventObj))
            .filter((event: EventlogEvent | undefined) => event != null);
    }

    private convertToEvent(eventObj: any): EventlogEvent | undefined {
        if (eventObj == null) {
            return undefined;
        }
        const eventLogAttributes = this.extractEventLogAttributes(eventObj);
        const activity = this.getAttributeWithKey(
            eventLogAttributes,
            this._activityEventLogAttributeKey
        );
        if (activity == null || !(activity instanceof StringAttribute)) {
            throw XesParser.PARSING_ERROR;
        }
        const lifecycleAttribute = this.getAttributeWithKey(
            eventLogAttributes,
            this._lifecycleEventLogAttributeKey
        );
        let lifecycle = undefined;
        if (
            lifecycleAttribute != null &&
            lifecycleAttribute instanceof StringAttribute
        ) {
            lifecycle = lifecycleAttribute.value as Lifecycle;
        }

        const eventLogAttributesWithoutActivity = eventLogAttributes.filter(
            eventLogAttribute =>
                ![
                    this._activityEventLogAttributeKey,
                    this._lifecycleEventLogAttributeKey,
                ].includes(eventLogAttribute.key.toLowerCase())
        );
        return new EventlogEvent(
            eventLogAttributesWithoutActivity,
            activity.value,
            lifecycle
        );
    }

    private getAttributeWithKey(
        eventLogAttributes: EventlogAttribute[],
        key: string
    ): EventlogAttribute | undefined {
        const actsWithKey = eventLogAttributes.filter(
            eventLogAttribute =>
                eventLogAttribute.key.toLowerCase() === key.toLowerCase()
        );
        if (actsWithKey.length > 1) {
            throw XesParser.PARSING_ERROR;
        }
        return actsWithKey.length === 1 ? actsWithKey[0] : undefined;
    }

    private extractEventLogAttributes(eventObj: any): EventlogAttribute[] {
        if (eventObj == null) {
            return [];
        }
        return Object.entries(eventObj)
            .filter(value => value.length == 2)
            .filter(value => this._allXesElements.includes(value[0]))
            .map(value =>
                this.extractEventLogAttributesOfType(value[0], value[1])
            )
            .flatMap(attributesPerType => attributesPerType);
    }

    private extractEventLogAttributesOfType(
        type: string,
        attributes: any
    ): EventlogAttribute[] {
        if (attributes == null) {
            return [];
        }
        const directAttributes = attributes
            .map(
                (attribute: { [x: string]: any }) =>
                    attribute[this._attributesToken]
            )
            .filter(
                (attribute: { [x: string]: any }) =>
                    attribute[this._valueToken].trim() !== '' &&
                    attribute[this._keyToken].trim() !== ''
            )
            .map((attribute: { [x: string]: any }) =>
                this.buildAttribute(
                    type,
                    attribute[this._valueToken],
                    attribute[this._keyToken]
                )
            )
            .filter(
                (attribute: EventlogAttribute | undefined) => attribute != null
            );
        const subAttributes = attributes
            .map((attribute: { [x: string]: any }) => attribute[type])
            .flatMap((subAttribute: any) =>
                this.extractEventLogAttributesOfType(type, subAttribute)
            );
        return directAttributes.concat(subAttributes);
    }

    private buildAttribute(
        type: string,
        value: any,
        key: string
    ): EventlogAttribute | undefined {
        switch (type) {
            case this._stringAttributeToken:
                return new StringAttribute(value, key);
            case this._dateAttributeToken:
                return new DateAttribute(new Date(value), key);
            case this._intAttributeToken:
                return new IntAttribute(Number(value), key);
            case this._floatAttributeToken:
                return new FloatAttribute(Number(value), key);
            case this._booleanAttributeToken:
                return new BooleanAttribute(Boolean(value), key);
            default:
                console.error(
                    'unknown attribute type ' +
                        type +
                        ' with value ' +
                        value +
                        ' will be ignored'
                );
                return undefined;
        }
    }

    private static extractCaseId(
        attributes: EventlogAttribute[]
    ): number | undefined {
        const filterAttributes = attributes.filter(
            attr => attr.key === 'concept:name' || attr.key === 'case-id'
        );
        if (filterAttributes.length > 0) {
            return parseInt(filterAttributes[0].value);
        }
        return undefined;
    }
}
