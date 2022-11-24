import 'reflect-metadata';
import { jsonObject, jsonMember } from 'typedjson';

export abstract class EventlogAttribute {
    @jsonMember(String)
    key: string = '';
    abstract value: any;

    abstract clone(): EventlogAttribute;
}

@jsonObject
export class StringAttribute extends EventlogAttribute {
    @jsonMember(String)
    value: string;

    constructor(value: string, key: string) {
        super();
        this.value = value;
        this.key = key;
    }

    override clone(): StringAttribute {
        return new StringAttribute(this.value, this.key);
    }
}

@jsonObject
export class DateAttribute extends EventlogAttribute {
    @jsonMember(Date)
    value: Date;

    constructor(value: Date, key: string) {
        super();
        this.value = value;
        this.key = key;
    }

    override clone(): DateAttribute {
        return new DateAttribute(this.value, this.key);
    }
}

@jsonObject
export class IntAttribute extends EventlogAttribute {
    @jsonMember(Number)
    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = Math.round(value);
        this.key = key;
    }

    override clone(): IntAttribute {
        return new IntAttribute(this.value, this.key);
    }
}

@jsonObject
export class FloatAttribute extends EventlogAttribute {
    @jsonMember(Number)
    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = value;
        this.key = key;
    }

    override clone(): FloatAttribute {
        return new FloatAttribute(this.value, this.key);
    }
}

@jsonObject
export class BooleanAttribute extends EventlogAttribute {
    @jsonMember(Boolean)
    value: boolean;

    constructor(value: boolean, key: string) {
        super();
        this.value = value;
        this.key = key;
    }

    override clone(): BooleanAttribute {
        return new BooleanAttribute(this.value, this.key);
    }
}
