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

    // u.a. keine Nutzung von WebWorkers, um Exceptions einsehen zu können
    @jsonMember(Boolean)
    private _isDebugModusEnabled : boolean;

    @jsonMember(TerminationCondition)
    private _terminationCondition: TerminationCondition;

    constructor(
        isDebugModusEnabled: boolean = false,
        terminationCondition: TerminationCondition = new TimeBasedTermination()
    ) {
        this._isDebugModusEnabled = isDebugModusEnabled;
        this._terminationCondition = terminationCondition;
    }

    public get terminationCondition(): TerminationCondition {
        return this._terminationCondition;
    }

    public set terminationCondition(value: TerminationCondition) {
        this._terminationCondition = value;
    }

    get isDebugModusEnabled(): boolean {
        return this._isDebugModusEnabled;
    }

    set isDebugModusEnabled(value: boolean) {
        this._isDebugModusEnabled = value;
    }
}
