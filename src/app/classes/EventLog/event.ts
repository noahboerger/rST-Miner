import {
    BooleanAttribute,
    DateAttribute,
    EventLogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from './eventlogattribute';
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
export class Event {
    @jsonArrayMember(EventLogAttribute)
    private _attributes: Array<EventLogAttribute>;
    @jsonMember(String)
    private _activity: string;

    public get attributes(): Array<EventLogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventLogAttribute>) {
        this._attributes = value;
    }

    public get activity(): string {
        return this._activity;
    }

    public set activity(value: string) {
        this._activity = value;
    }

    public getAttribute(key: string): EventLogAttribute {
        return this._attributes.filter(
            attribute => key === attribute.key.toString()
        )[0];
    }

    constructor(attributes: Array<EventLogAttribute>, activity: string) {
        this._activity = activity;
        this._attributes = attributes;
    }
}
