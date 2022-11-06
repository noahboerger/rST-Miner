import {
    BooleanAttribute,
    DateAttribute,
    EventlogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from './eventlog-attribute';
import { Event } from './event';
import 'reflect-metadata';
import { jsonObject, jsonMember, jsonArrayMember } from 'typedjson';

@jsonObject({
    knownTypes: [
        StringAttribute,
        DateAttribute,
        IntAttribute,
        FloatAttribute,
        BooleanAttribute,
    ],
})
export class Trace {
    @jsonArrayMember(EventlogAttribute)
    private _attributes: Array<EventlogAttribute>;
    @jsonArrayMember(Event)
    private _events: Array<Event>;
    @jsonMember(Number)
    private _caseId: number;

    public get attributes(): Array<EventlogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventlogAttribute>) {
        this._attributes = value;
    }

    public get events(): Array<Event> {
        return this._events;
    }
    public set events(value: Array<Event>) {
        this._events = value;
    }

    public get caseId(): number {
        return this._caseId;
    }
    public set caseId(value: number) {
        this._caseId = value;
    }

    constructor(
        attributes: Array<EventlogAttribute>,
        events: Array<Event>,
        caseId: number
    ) {
        this._attributes = attributes;
        this._events = events;
        this._caseId = caseId;
    }
}
