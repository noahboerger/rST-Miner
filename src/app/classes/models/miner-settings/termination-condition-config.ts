import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import { Duration } from 'ts-duration';
import { PetriNet } from '../petri-net/petri-net';

export abstract class TerminationConditionConfig {
    private static DEFAULT_NO_CHANGE_SINCE_ENABLED = true;

    @jsonMember(Boolean)
    private _noChangeSinceEnabled: boolean;

    protected constructor(
        noChangeSinceEnabled = TerminationConditionConfig.DEFAULT_NO_CHANGE_SINCE_ENABLED
    ) {
        this._noChangeSinceEnabled = noChangeSinceEnabled;
    }

    abstract get simpleName(): string;

    public buildIsTerminationConditionReachedFunction(): (
        actState: PetriNet,
        numPlacesEvaluated: number
    ) => boolean {
        if (!this._noChangeSinceEnabled) {
            return this.toIsTerminationConditionReachedFunction();
        } else {
            function calculateLastChangedPlace(petriNet: PetriNet): number {
                const placeNumbers = petriNet
                    .getPlaces()
                    .map(place => Number.parseInt(place.id!.substring(1))); // remove p-prefix
                if (placeNumbers.length > 0) {
                    return placeNumbers.sort((a, b) => b - a)[0];
                }
                return -1;
            }

            const subCondition = this;
            let prevLastChangedPlace = -1;
            let subConditionReachedFct =
                subCondition.toIsTerminationConditionReachedFunction();

            return function (actState: PetriNet, numPlacesEvaluated: number) {
                let lastChangedPlace = calculateLastChangedPlace(actState);
                const changed = prevLastChangedPlace !== lastChangedPlace;

                // reset of terminationReachedFct
                if (changed) {
                    prevLastChangedPlace = lastChangedPlace;
                    subConditionReachedFct =
                        subCondition.toIsTerminationConditionReachedFunction();
                }
                // also need to calculate places evaluated since last change
                const numPlacesEvaluatedSinceLastChange =
                    numPlacesEvaluated - prevLastChangedPlace;
                return subConditionReachedFct(
                    actState,
                    numPlacesEvaluatedSinceLastChange
                );
            };
        }
    }

    protected abstract toIsTerminationConditionReachedFunction(): (
        actState: PetriNet,
        numPlacesEvaluated: number
    ) => boolean;

    get noChangeSinceEnabled(): boolean {
        return this._noChangeSinceEnabled;
    }

    set noChangeSinceEnabled(value: boolean) {
        this._noChangeSinceEnabled = value;
    }
}

@jsonObject
export class LoopBasedTerminationConfig extends TerminationConditionConfig {
    public static readonly SIMPLE_NAME = 'Loop Iterations';
    public static readonly DEFAULT_ITERATIONS = 10_000;

    @jsonMember(Number)
    private _loopAmount: number;

    constructor(
        loopAmount: number = LoopBasedTerminationConfig.DEFAULT_ITERATIONS
    ) {
        super();
        this._loopAmount = loopAmount;
    }

    get simpleName(): string {
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

    protected toIsTerminationConditionReachedFunction(): (
        actState: PetriNet,
        numPlacesEvaluated: number
    ) => boolean {
        const loopAmount = this._loopAmount;
        let actLoop = 0;
        return function (actState: PetriNet, numPlacesEvaluated: number) {
            actLoop++;
            return actLoop >= loopAmount;
        };
    }
}

@jsonObject
export class EvaluatedPlacesTerminationConfig extends TerminationConditionConfig {
    public static readonly SIMPLE_NAME = 'Evaluated Places';
    public static readonly DEFAULT_AMOUNT_EVALUATED_OF_PLACES = 50_000;

    @jsonMember(Number)
    private _amountOfEvaluatedPlaces: number;

    constructor(
        amountOfPlaces: number = EvaluatedPlacesTerminationConfig.DEFAULT_AMOUNT_EVALUATED_OF_PLACES
    ) {
        super();
        this._amountOfEvaluatedPlaces = amountOfPlaces;
    }

    get simpleName(): string {
        return EvaluatedPlacesTerminationConfig.SIMPLE_NAME;
    }

    get amountOfEvaluatedPlaces(): number {
        return this._amountOfEvaluatedPlaces;
    }

    set amountOfEvaluatedPlaces(value: number) {
        if (value == null || value <= 0) {
            this._amountOfEvaluatedPlaces =
                EvaluatedPlacesTerminationConfig.DEFAULT_AMOUNT_EVALUATED_OF_PLACES;
        } else {
            this._amountOfEvaluatedPlaces = value;
        }
    }

    protected toIsTerminationConditionReachedFunction(): (
        actState: PetriNet,
        numPlacesEvaluated: number
    ) => boolean {
        const amountOfPlaces = this._amountOfEvaluatedPlaces;
        return function (actState: PetriNet, numPlacesEvaluated: number) {
            return numPlacesEvaluated >= amountOfPlaces;
        };
    }
}

@jsonObject
export class TimeBasedTerminationConfig extends TerminationConditionConfig {
    public static readonly SIMPLE_NAME = 'Time Duration';
    public static readonly DEFAULT_DURATION = Duration.second(1);

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

    get simpleName(): string {
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

    protected toIsTerminationConditionReachedFunction(): (
        actState: PetriNet,
        numPlacesEvaluated: number
    ) => boolean {
        const durationInMs = this._durationInMs;
        const startTime = new Date();
        return function (actState: PetriNet, numPlacesEvaluated: number) {
            return Duration.since(startTime).milliseconds >= durationInMs;
        };
    }
}
