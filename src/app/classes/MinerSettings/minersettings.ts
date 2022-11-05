import 'reflect-metadata';
import {jsonMember, jsonObject} from 'typedjson';
import {LoopBasedTermination, TerminationCondition, TimeBasedTermination} from "./terminationcondition";

@jsonObject({
    knownTypes: [
        TerminationCondition
    ],
})
export class MinerSettings {

    public static terminationTypesSimpleNames = [LoopBasedTermination.SIMPLE_NAME, TimeBasedTermination.SIMPLE_NAME]; // TODO extend im Necessary

    @jsonMember(TerminationCondition)
    private _terminationCondition: TerminationCondition;

    constructor(terminationCondition: TerminationCondition = new TimeBasedTermination()) { // TODO default in DataService setze
        this._terminationCondition = terminationCondition;
    }

    public get terminationCondition(): TerminationCondition {
        return this._terminationCondition;
    }

    public set terminationCondition(value: TerminationCondition) {
        this._terminationCondition = value;
    }
}
