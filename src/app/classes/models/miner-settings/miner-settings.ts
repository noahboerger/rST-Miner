import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import {
    LoopBasedTermination,
    TerminationCondition,
    TimeBasedTermination,
} from './termination-condition';

@jsonObject({
    knownTypes: [LoopBasedTermination, TimeBasedTermination],
})
export class MinerSettings {
    public static terminationTypesSimpleNames = [
        LoopBasedTermination.SIMPLE_NAME,
        TimeBasedTermination.SIMPLE_NAME,
    ];

    @jsonMember(TerminationCondition)
    private _terminationCondition: TerminationCondition;

    constructor(
        terminationCondition: TerminationCondition = new TimeBasedTermination()
    ) {
        this._terminationCondition = terminationCondition;
    }

    public get terminationCondition(): TerminationCondition {
        return this._terminationCondition;
    }

    public set terminationCondition(value: TerminationCondition) {
        this._terminationCondition = value;
    }
}
