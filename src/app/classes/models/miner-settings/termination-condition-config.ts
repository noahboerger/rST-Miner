import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import { Duration } from 'ts-duration';
import { PetriNet } from '../petri-net/petri-net';

// Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt
export abstract class TerminationConditionConfig {
    abstract getSimpleName(): string;

    abstract toIsTerminationConditionReachedFunction(): (
        actState: PetriNet
    ) => boolean;
}

@jsonObject
export class LoopBasedTerminationConfig extends TerminationConditionConfig {
    public static readonly SIMPLE_NAME = 'Loop Iterations';
    public static readonly DEFAULT_ITERATIONS = 100_000;

    @jsonMember(Number)
    private _loopAmount: number;

    constructor(
        loopAmount: number = LoopBasedTerminationConfig.DEFAULT_ITERATIONS
    ) {
        super();
        this._loopAmount = loopAmount;
    }

    getSimpleName(): string {
        return LoopBasedTerminationConfig.SIMPLE_NAME;
    }

    get loopAmount(): number {
        return this._loopAmount;
    }

    set loopAmount(value: number) {
        if (value == null || value <= 0) {
            this._loopAmount = LoopBasedTerminationConfig.DEFAULT_ITERATIONS;
        } else {
            this._loopAmount = value;
        }
    }

    toIsTerminationConditionReachedFunction(): (actState: PetriNet) => boolean {
        const loopAmount = this._loopAmount;
        let actLoop = 0;
        return function (actState: PetriNet) {
            actLoop++;
            return actLoop >= loopAmount;
        };
    }
}

@jsonObject
export class TimeBasedTerminationConfig extends TerminationConditionConfig {
    public static readonly SIMPLE_NAME = 'Time Duration';
    public static readonly DEFAULT_DURATION = Duration.second(30);

    public static MILLISECONDS = 'ms';
    public static SECONDS = 's';
    public static MINUTES = 'm';
    public static HOURS = 'h';

    public static SUPPORTED_TIME_UNITS = [
        TimeBasedTerminationConfig.MILLISECONDS,
        TimeBasedTerminationConfig.SECONDS,
        TimeBasedTerminationConfig.MINUTES,
        TimeBasedTerminationConfig.HOURS,
    ];

    @jsonMember(Number)
    private _durationInMs: number;

    constructor(
        duration: Duration = TimeBasedTerminationConfig.DEFAULT_DURATION
    ) {
        super();
        this._durationInMs = duration.milliseconds;
    }

    getSimpleName(): string {
        return TimeBasedTerminationConfig.SIMPLE_NAME;
    }

    get duration(): Duration {
        return Duration.millisecond(this._durationInMs);
    }

    set duration(value: Duration) {
        if (value == null || value.milliseconds < 0) {
            this._durationInMs =
                TimeBasedTerminationConfig.DEFAULT_DURATION.milliseconds;
        } else {
            this._durationInMs = value.milliseconds;
        }
    }

    public getDurationIn(timeUnit: string): number {
        switch (timeUnit) {
            case TimeBasedTerminationConfig.MILLISECONDS:
                return this.duration.milliseconds;
            case TimeBasedTerminationConfig.SECONDS:
                return this.duration.seconds;
            case TimeBasedTerminationConfig.MINUTES:
                return this.duration.minutes;
            case TimeBasedTerminationConfig.HOURS:
                return this.duration.hours;
        }
        return -1;
    }

    public setDurationIn(timeUnit: string, value: number) {
        if (value == null || value < 0) {
            this.duration = TimeBasedTerminationConfig.DEFAULT_DURATION;
        } else {
            switch (timeUnit) {
                case TimeBasedTerminationConfig.MILLISECONDS:
                    this.duration = Duration.millisecond(value);
                    break;
                case TimeBasedTerminationConfig.SECONDS:
                    this.duration = Duration.second(value);
                    break;
                case TimeBasedTerminationConfig.MINUTES:
                    this.duration = Duration.minute(value);
                    break;
                case TimeBasedTerminationConfig.HOURS:
                    this.duration = Duration.hour(value);
                    break;
            }
        }
    }

    toIsTerminationConditionReachedFunction(): (actState: PetriNet) => boolean {
        const durationInMs = this._durationInMs;
        const startTime = new Date();
        return function (actState: PetriNet) {
            return Duration.since(startTime).milliseconds >= durationInMs;
        };
    }
}
