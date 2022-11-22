import {Node} from './node';

export class Place extends Node {

    private _marking: number;

    constructor(marking: number = 0, id?: string) {
        super(id);
        this._marking = marking;
    }

    get marking(): number {
        return this._marking;
    }

    set marking(value: number) {
        this._marking = value;
    }
}
