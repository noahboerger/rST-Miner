import {
    BooleanAttribute,
    DateAttribute,
    EventlogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from './eventlog-attribute';
import { Classifier } from './classifier';
import { Trace } from './trace';
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
    @jsonArrayMember(Classifier)
    private _classifiers: Array<Classifier>;
    @jsonArrayMember(EventlogAttribute)
    private _globalEventAttributes: Array<EventlogAttribute>;
    @jsonArrayMember(EventlogAttribute)
    private _globalTraceAttributes: Array<EventlogAttribute>;
    @jsonArrayMember(EventlogAttribute)
    private _attributes: Array<EventlogAttribute>;
    @jsonArrayMember(Trace)
    private _traces: Array<Trace>;

    public get classifiers(): Array<Classifier> {
        return this._classifiers;
    }
    public set classifiers(value: Array<Classifier>) {
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

    public get traces(): Array<Trace> {
        return this._traces;
    }

    public set traces(value: Array<Trace>) {
        this._traces = value;
    }

    public get sortedTraces(): Array<Array<Trace>> {
        let result = new Array<Array<Trace>>();

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
                let arr = new Array<Trace>();
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
        classifiers: Array<Classifier>,
        globalEventAttributes: Array<EventlogAttribute>,
        globalTraceAttributes: Array<EventlogAttribute>,
        traces: Array<Trace>,
        attributes: Array<EventlogAttribute>
    ) {
        this._classifiers = classifiers;
        this._globalEventAttributes = globalEventAttributes;
        this._globalTraceAttributes = globalTraceAttributes;
        this._attributes = attributes;
        this._traces = traces;
    }
}
