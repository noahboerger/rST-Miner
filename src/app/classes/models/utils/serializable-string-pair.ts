import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class SerializableStringPair {
    @jsonMember(String)
    public left: string;

    @jsonMember(String)
    public right: string;

    constructor(left: string, right: string) {
        this.left = left;
        this.right = right;
    }
}
