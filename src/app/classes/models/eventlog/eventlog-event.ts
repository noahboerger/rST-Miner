import {
    BooleanAttribute,
    DateAttribute,
    EventlogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from './eventlog-attribute';
import 'reflect-metadata';
import {jsonArrayMember, jsonMember, jsonObject} from 'typedjson';
import {Lifecycle} from "./utils/lifecycle";

@jsonObject({
    knownTypes: [
        StringAttribute,
        DateAttribute,
        IntAttribute,
        FloatAttribute,
        BooleanAttribute,
    ],
})
export class EventlogEvent {

    @jsonArrayMember(EventlogAttribute)
    private _attributes: Array<EventlogAttribute>;

    @jsonMember(String)
    private _activity: string;

    @jsonMember(String)
    private _lifecycleAsString?: string; // TODO private setters for alle attributes (einfache finale Datentypen)
// TODO PARSEN!!!!

    private _pair?: EventlogEvent; // TODO kein guter Stil, nutze Map Pair oder ähnliches wo notwendig


    constructor(attributes: Array<EventlogAttribute>, activity: string, lifecycle?: Lifecycle) {
        this._activity = activity;
        this._attributes = attributes;
        this._lifecycleAsString = lifecycle;
    }

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

    get lifecycle(): Lifecycle | undefined {
        if (this._lifecycleAsString == undefined) {
            return undefined;
        }
        return this._lifecycleAsString as Lifecycle;
    }

    set lifecycle(value: Lifecycle | undefined) {
        this._lifecycleAsString = value;
    }

    public getAttribute(key: string): EventlogAttribute {
        return this._attributes.filter(
            attribute => key === attribute.key.toString()
        )[0];
    }

    public setPairEvent(pair: EventlogEvent) {
        this._pair = pair;
    }

    public getPairEvent(): EventlogEvent | undefined {
        return this._pair;
    }
}
