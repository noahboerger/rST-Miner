import {
    BooleanAttribute,
    DateAttribute,
    EventlogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from './eventlog-attribute';
import { EventlogClassifier } from './eventlog-classifier';
import { EventlogTrace } from './eventlog-trace';
import 'reflect-metadata';
import { jsonObject, jsonArrayMember } from 'typedjson';

@jsonObject({
    knownTypes: [
        StringAttribute,
        DateAttribute,
        IntAttribute,
        FloatAttribute,
        BooleanAttribute,
    ],
})
export class Eventlog {
    @jsonArrayMember(EventlogClassifier)
    private _classifiers: Array<EventlogClassifier>;
    @jsonArrayMember(EventlogAttribute)
    private _globalEventAttributes: Array<EventlogAttribute>;
    @jsonArrayMember(EventlogAttribute)
    private _globalTraceAttributes: Array<EventlogAttribute>;
    @jsonArrayMember(EventlogAttribute)
    private _attributes: Array<EventlogAttribute>;
    @jsonArrayMember(EventlogTrace)
    private _traces: Array<EventlogTrace>;

    public get classifiers(): Array<EventlogClassifier> {
        return this._classifiers;
    }
    public set classifiers(value: Array<EventlogClassifier>) {
        this._classifiers = value;
    }

    public get globalEventAttributes(): Array<EventlogAttribute> {
        return this._globalEventAttributes;
    }
    public set globalEventAttributes(value: Array<EventlogAttribute>) {
        this._globalEventAttributes = value;
    }

    public get globalTraceAttributes(): Array<EventlogAttribute> {
        return this._globalTraceAttributes;
    }
    public set globalTraceAttributes(value: Array<EventlogAttribute>) {
        this._globalTraceAttributes = value;
    }

    public get attributes(): Array<EventlogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventlogAttribute>) {
        this._attributes = value;
    }

    public get traces(): Array<EventlogTrace> {
        return this._traces;
    }

    public set traces(value: Array<EventlogTrace>) {
        this._traces = value;
    }

    public get sortedTraces(): Array<Array<EventlogTrace>> {
        let result = new Array<Array<EventlogTrace>>();

        this._traces.forEach(trace => {
            const index = result.findIndex(val => {
                for (let i = 0; i < val[0].events.length; i++) {
                    if (val[0].events.length !== trace.events.length) {
                        return false;
                    }
                    if (
                        val[0].events[i].activity !== trace.events[i].activity
                    ) {
                        return false;
                    }
                }
                return true;
            });
            if (index == -1) {
                let arr = new Array<EventlogTrace>();
                arr.push(trace);
                result.push(arr);
            } else {
                result[index].push(trace); // Trace zu den anderen hinzufügen die die gleichen Events haben
            }
        });
        result.sort((a, b) => {
            return b.length - a.length;
        });
        return result;
    }

    constructor(
        classifiers: Array<EventlogClassifier>,
        globalEventAttributes: Array<EventlogAttribute>,
        globalTraceAttributes: Array<EventlogAttribute>,
        traces: Array<EventlogTrace>,
        attributes: Array<EventlogAttribute>
    ) {
        this._classifiers = classifiers;
        this._globalEventAttributes = globalEventAttributes;
        this._globalTraceAttributes = globalTraceAttributes;
        this._attributes = attributes;
        this._traces = traces;
    }
}
