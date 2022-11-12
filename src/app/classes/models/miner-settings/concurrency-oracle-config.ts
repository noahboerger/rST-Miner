import 'reflect-metadata';
import {jsonMember, jsonObject} from 'typedjson';
import {ConcurrencyOracle} from "../../algorithms/concurrency-oracle/concurrency-oracle";
import {NoneOracle} from "../../algorithms/concurrency-oracle/none-oracle/none-oracle";
import {AlphaOracle} from "../../algorithms/concurrency-oracle/alpha-oracle/alpha-oracle";
import {TimestampOracle} from "../../algorithms/concurrency-oracle/timestamp-oracle/timestamp-oracle";

export abstract class ConcurrencyOracleConfig {

    public static readonly DEFAULT_CLEAN_LIFECYCLE = true;
    public static readonly DEFAULT_ADD_START_STOP_EVENT = false;
    public static readonly DEFAULT_DISCARD_PREFIXES = true; // TODO --> WAS MACHT DAS

    @jsonMember(Boolean)
    private _cleanLifecycle: boolean;

    @jsonMember(Boolean)
    private _addStartStopEvent: boolean;

    @jsonMember(Boolean)
    private _discardPrefixes: boolean;

    abstract getSimpleName(): string;

    abstract generateConcurrencyOracle(): ConcurrencyOracle;
}

@jsonObject
export class NoneOracleConfig extends ConcurrencyOracleConfig {
    public static readonly SIMPLE_NAME = 'None';

    getSimpleName(): string {
        return NoneOracleConfig.SIMPLE_NAME;
    }

    generateConcurrencyOracle(): ConcurrencyOracle {
        return new NoneOracle();
    }
}

@jsonObject
export class AlphaOracleConfig extends ConcurrencyOracleConfig {

    public static readonly SIMPLE_NAME = 'Alpha';

    public static readonly DEFAULT_LOOK_AHEAD_DISTANCE = 1;
    public static readonly DEFAULT_DISTINGUISH_SAME_EVENTS = false;

    @jsonMember(Number)
    private _lookAheadDistance: number;

    @jsonMember(Boolean)
    public distinguishSameEvents: boolean;

    constructor(lookAheadDistance: number = AlphaOracleConfig.DEFAULT_LOOK_AHEAD_DISTANCE,
                distinguishSameEvents: boolean = AlphaOracleConfig.DEFAULT_DISTINGUISH_SAME_EVENTS) {
        super();
        this._lookAheadDistance = lookAheadDistance;
        this.distinguishSameEvents = distinguishSameEvents;
    }

    getSimpleName(): string {
        return AlphaOracleConfig.SIMPLE_NAME;
    }

    get lookAheadDistance(): number {
        return this._lookAheadDistance;
    }

    set lookAheadDistance(value: number) {
        if (value == null || value < 0) {
            this._lookAheadDistance = AlphaOracleConfig.DEFAULT_LOOK_AHEAD_DISTANCE;
        }
        this._lookAheadDistance = value;
    }

    generateConcurrencyOracle(): ConcurrencyOracle {
        return new AlphaOracle({
            lookAheadDistance: this.lookAheadDistance,
            distinguishSameLabels: this.distinguishSameEvents
        });
    }
}

@jsonObject
export class TimestampOracleConfig extends ConcurrencyOracleConfig {

    public static readonly SIMPLE_NAME = 'Timestamp';

    public static readonly DEFAULT_DISTINGUISH_SAME_EVENTS = false;

    @jsonMember(Boolean)
    public distinguishSameEvents: boolean;

    constructor(
        distinguishSameEvents: boolean = TimestampOracleConfig.DEFAULT_DISTINGUISH_SAME_EVENTS) {
        super();
        this.distinguishSameEvents = distinguishSameEvents;
    }

    getSimpleName(): string {
        return TimestampOracleConfig.SIMPLE_NAME;
    }

    generateConcurrencyOracle(): ConcurrencyOracle {
        return new TimestampOracle({
            distinguishSameLabels: this.distinguishSameEvents
        });
    }
}

