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

    @jsonMember(Number)
    private _loopAmount: number;

    constructor(loopAmount: number = LoopBasedTermination.DEFAULT_ITERATIONS) {
        super();
        this._loopAmount = loopAmount
    }

    getSimpleName(): string {
        return LoopBasedTermination.SIMPLE_NAME;
    }

    get loopAmount(): number {
        return this._loopAmount;
    }

    set loopAmount(value: number) {
        if (value == null) {
            this.loopAmount = LoopBasedTermination.DEFAULT_ITERATIONS;
        } else {
            this._loopAmount = value;
        }
    }
}

@jsonObject
export class TimeBasedTermination extends TerminationCondition {


    public static SIMPLE_NAME = "Time Duration";
    public static DEFAULT_DURATION = Duration.second(30); // TODO Test and adapt;

    public static MILLISECONDS = "ms"
    public static SECONDS = "s"
    public static MINUTES = "m"
    public static HOURS = "h"

    public static SUPPORTED_TIME_UNITS = [TimeBasedTermination.MILLISECONDS, TimeBasedTermination.SECONDS, TimeBasedTermination.MINUTES, TimeBasedTermination.HOURS]


    @jsonMember(Number)
    private _durationInMs: number;

    constructor(duration: Duration = TimeBasedTermination.DEFAULT_DURATION) {
        super();
        this._durationInMs = duration.milliseconds;
    }

    getSimpleName(): string {
        return TimeBasedTermination.SIMPLE_NAME;
    }

    get duration(): Duration {
        return Duration.millisecond(this._durationInMs);
    }

    set duration(value: Duration) {
        if (value == null) {
            this._durationInMs = TimeBasedTermination.DEFAULT_DURATION.milliseconds;
        } else {
            this._durationInMs = value.milliseconds;
        }
    }

    public getDurationIn(timeUnit: string): number {
        switch (timeUnit) {
            case TimeBasedTermination.MILLISECONDS:
                return this.duration.milliseconds;
            case TimeBasedTermination.SECONDS:
                return this.duration.seconds;
            case TimeBasedTermination.MINUTES:
                return this.duration.minutes;
            case TimeBasedTermination.HOURS:
                return this.duration.hours;
        }
        return -1;
    }

    public setDurationIn(timeUnit: string, value: number) {
        if (value == null) {
            this.duration = TimeBasedTermination.DEFAULT_DURATION;
        } else {
            switch (timeUnit) {
                case TimeBasedTermination.MILLISECONDS:
                    this.duration = Duration.millisecond(value);
                    break;
                case TimeBasedTermination.SECONDS:
                    this.duration = Duration.second(value);
                    break;
                case TimeBasedTermination.MINUTES:
                    this.duration = Duration.minute(value);
                    break;
                case TimeBasedTermination.HOURS:
                    this.duration = Duration.hour(value);
                    break;
            }
        }
    }
}

// TODO Quality Based
