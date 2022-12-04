import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import {
    LoopBasedTerminationConfig,
    TerminationConditionConfig,
    TimeBasedTerminationConfig,
} from './termination-condition-config';
import {
    AlphaOracleConfig,
    ConcurrencyOracleConfig,
    NoneOracleConfig,
    TimestampOracleConfig,
} from './concurrency-oracle-config';
import { PartialOrderTransformationConfig } from './partial-order-transformation-config';
import {
    PrimitiveGeneratorConfig,
    RandomPlaceGeneratorConfig,
} from './random-place-generator-config';
import { ImplicitPlaceIdentificationConfig } from './implicit-place-identification-config';

@jsonObject({
    knownTypes: [
        NoneOracleConfig,
        AlphaOracleConfig,
        TimestampOracleConfig,
        PrimitiveGeneratorConfig,
        LoopBasedTerminationConfig,
        TimeBasedTerminationConfig,
    ],
})
export class RstMinerSettings {
    public static readonly DEFAULT_DEBUG_MODUS_ENABLED = false;

    public static readonly concurrencyOracleTypesSimpleNames = [
        NoneOracleConfig.SIMPLE_NAME,
        AlphaOracleConfig.SIMPLE_NAME,
        TimestampOracleConfig.SIMPLE_NAME,
    ];

    public static readonly terminationTypesSimpleNames = [
        LoopBasedTerminationConfig.SIMPLE_NAME,
        TimeBasedTerminationConfig.SIMPLE_NAME,
    ];

    public static readonly randomPlaceGeneratorTypesSimpleNames = [
        PrimitiveGeneratorConfig.SIMPLE_NAME,
    ];

    @jsonMember(ConcurrencyOracleConfig)
    public concurrencyOracle: ConcurrencyOracleConfig;

    @jsonMember(PartialOrderTransformationConfig)
    public partialOrderTransformation: PartialOrderTransformationConfig;

    @jsonMember(RandomPlaceGeneratorConfig)
    public randomPlaceGenerator: RandomPlaceGeneratorConfig;

    @jsonMember(TerminationConditionConfig)
    public terminationCondition: TerminationConditionConfig;

    @jsonMember(ImplicitPlaceIdentificationConfig)
    public implicitPlaceIdentification: ImplicitPlaceIdentificationConfig;

    // u.a. no usage of webworkers for better exception debuging
    @jsonMember(Boolean)
    public isDebugModusEnabled: boolean;

    constructor(
        concurrencyOracle: ConcurrencyOracleConfig = new NoneOracleConfig(),
        partialOrderTransformationConfig: PartialOrderTransformationConfig = new PartialOrderTransformationConfig(),
        randomPlaceGenerator: RandomPlaceGeneratorConfig = new PrimitiveGeneratorConfig(),
        terminationCondition: TerminationConditionConfig = new TimeBasedTerminationConfig(),
        implicitPlaceIdentification: ImplicitPlaceIdentificationConfig = new ImplicitPlaceIdentificationConfig(),
        isDebugModusEnabled: boolean = RstMinerSettings.DEFAULT_DEBUG_MODUS_ENABLED
    ) {
        this.concurrencyOracle = concurrencyOracle;
        this.partialOrderTransformation = partialOrderTransformationConfig;
        this.randomPlaceGenerator = randomPlaceGenerator;
        this.terminationCondition = terminationCondition;
        this.implicitPlaceIdentification = implicitPlaceIdentification;
        this.isDebugModusEnabled = isDebugModusEnabled;
    }
}
