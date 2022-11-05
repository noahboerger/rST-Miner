import 'reflect-metadata';
import {jsonMember, jsonObject} from 'typedjson';
import {Duration} from "ts-duration";

export abstract class TerminationCondition { // TODO -> Interface?
    //abstract toPredicate: (value: any) => boolean; TODO

    // TODO Method to Function<PetriNet, Boolean> [Predicate] o.ä.

    abstract getSimpleName(): string;
}

@jsonObject
export class LoopBasedTermination extends TerminationCondition {

    public static SIMPLE_NAME = "Loop Iterations";
    public static DEFAULT_ITERATIONS = 1_000_000; // TODO Test and adapt;

    @jsonMember(BigInt)
    private _loopAmount: number;

    constructor(loopAmount: number = LoopBasedTermination.DEFAULT_ITERATIONS) {
        super();
        this._loopAmount = loopAmount
    }

    getSimpleName(): string {
        return LoopBasedTermination.SIMPLE_NAME;
    }
}

@jsonObject
export class TimeBasedTermination extends TerminationCondition {

    public static SIMPLE_NAME = "Time Duration";
    public static DEFAULT_DURATION = Duration.second(30); // TODO Test and adapt;



    @jsonMember(Duration) // TODO ggf in ms umwandeln bei Serialisierungsproblemen
    private _duration: Duration;

    constructor(duration: Duration = TimeBasedTermination.DEFAULT_DURATION) {
        super();
        this._duration = duration;
    }

    getSimpleName(): string {
        return TimeBasedTermination.SIMPLE_NAME;
    }
}

// TODO Quality Based
