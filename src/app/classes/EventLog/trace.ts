import {
    BooleanAttribute,
    DateAttribute,
    EventLogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from './eventlogattribute';
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
    @jsonArrayMember(EventLogAttribute)
    private _attributes: Array<EventLogAttribute>;
    @jsonArrayMember(Event)
    private _events: Array<Event>;
    @jsonMember(Number)
    private _caseId: number;

    public get attributes(): Array<EventLogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventLogAttribute>) {
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
        attributes: Array<EventLogAttribute>,
        events: Array<Event>,
        caseId: number
    ) {
        this._attributes = attributes;
        this._events = events;
        this._caseId = caseId;
    }
}
