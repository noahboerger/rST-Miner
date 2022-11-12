import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import {
    LoopBasedTerminationConfig,
    TerminationConditionConfig,
    TimeBasedTerminationConfig,
} from './termination-condition-config';
import {ConcurrencyOracle} from "../../algorithms/concurrency-oracle/concurrency-oracle";
import {
    AlphaOracleConfig,
    ConcurrencyOracleConfig,
    NoneOracleConfig,
    TimestampOracleConfig
} from "./concurrency-oracle-config";

@jsonObject({
    knownTypes: [NoneOracleConfig, AlphaOracleConfig, TimestampOracleConfig, LoopBasedTerminationConfig, TimeBasedTerminationConfig],
})
export class MinerSettings {

    public static readonly concurrencyOracleTypesSimpleNames = [
        NoneOracleConfig.SIMPLE_NAME,
        AlphaOracleConfig.SIMPLE_NAME,
        TimestampOracleConfig.SIMPLE_NAME,
    ];

    public static readonly terminationTypesSimpleNames = [
        LoopBasedTerminationConfig.SIMPLE_NAME,
        TimeBasedTerminationConfig.SIMPLE_NAME,
    ];

    @jsonMember(ConcurrencyOracleConfig)
    public concurrencyOracle : ConcurrencyOracleConfig;

    @jsonMember(TerminationConditionConfig)
    public terminationCondition: TerminationConditionConfig;

    // u.a. keine Nutzung von WebWorkers, um Exceptions einsehen zu können
    @jsonMember(Boolean)
    public isDebugModusEnabled : boolean;

    constructor(
        isDebugModusEnabled: boolean = false,
        terminationCondition: TerminationConditionConfig = new TimeBasedTerminationConfig(),
        concurrencyOracle : ConcurrencyOracleConfig = new NoneOracleConfig()
    ) {
        this.isDebugModusEnabled = isDebugModusEnabled;
        this.terminationCondition = terminationCondition;
        this.concurrencyOracle = concurrencyOracle;
    }
}
