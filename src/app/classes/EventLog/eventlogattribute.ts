import 'reflect-metadata';
import { jsonObject, jsonMember } from 'typedjson';

export abstract class EventLogAttribute {
    @jsonMember(String)
    key: string = '';
    abstract value: any;
}

@jsonObject
export class StringAttribute extends EventLogAttribute {
    @jsonMember(String)
    value: string;

    constructor(value: string, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class DateAttribute extends EventLogAttribute {
    @jsonMember(Date)
    value: Date;

    constructor(value: Date, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class IntAttribute extends EventLogAttribute {
    @jsonMember(Number)
    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = Math.round(value);
        this.key = key;
    }
}

@jsonObject
export class FloatAttribute extends EventLogAttribute {
    @jsonMember(Number)
    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class BooleanAttribute extends EventLogAttribute {
    @jsonMember(Boolean)
    value: boolean;

    constructor(value: boolean, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}
