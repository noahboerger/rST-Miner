import {
    BooleanAttribute,
    DateAttribute,
    EventlogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from './eventlog-attribute';
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
    @jsonArrayMember(EventlogAttribute)
    private _attributes: Array<EventlogAttribute>;
    @jsonMember(String)
    private _activity: string;

    public get attributes(): Array<EventlogAttribute> {
        return this._attributes;
    }
    public set attributes(value: Array<EventlogAttribute>) {
        this._attributes = value;
    }

    public get activity(): string {
        return this._activity;
    }

    public set activity(value: string) {
        this._activity = value;
    }

    public getAttribute(key: string): EventlogAttribute {
        return this._attributes.filter(
            attribute => key === attribute.key.toString()
        )[0];
    }

    constructor(attributes: Array<EventlogAttribute>, activity: string) {
        this._activity = activity;
        this._attributes = attributes;
    }
}
