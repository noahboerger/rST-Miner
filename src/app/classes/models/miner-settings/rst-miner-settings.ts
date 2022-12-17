import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import {
    EvaluatedPlacesTerminationConfig,
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
    GeometricDistributionGeneratorConfig,
    PrimitiveGeneratorConfig,
    RandomPlaceGeneratorConfig,
} from './random-place-generator-config';
import { ImplicitPlaceIdentificationConfig } from './implicit-place-identification-config';
import {
    NoiseReductionConfig,
    NoNoiseReductionConfig,
    PlaceEvaluationNoiseReductionConfig,
    PreprocessingNoiseReductionConfig,
} from './noise-reduction-config';
import { ProcessModelCharacteristicsConfig } from './process-model-characteristics-config';

@jsonObject({
    knownTypes: [
        NoNoiseReductionConfig,
        PreprocessingNoiseReductionConfig,
        PlaceEvaluationNoiseReductionConfig,
        NoneOracleConfig,
        AlphaOracleConfig,
        TimestampOracleConfig,
        GeometricDistributionGeneratorConfig,
        PrimitiveGeneratorConfig,
        LoopBasedTerminationConfig,
        EvaluatedPlacesTerminationConfig,
        TimeBasedTerminationConfig,
    ],
})
export class RstMinerSettings {
    public static readonly DEFAULT_DEBUG_MODUS_ENABLED = false;
    public static readonly DEFAULT_DOWNLOAD_PETRI_NET_ENABLED = true;
    public static readonly DEFAULT_DOWNLOAD_REPORT_ENABLED = false;

    public static readonly noiseReductionTypesSimpleNames = [
        NoNoiseReductionConfig.SIMPLE_NAME,
        PreprocessingNoiseReductionConfig.SIMPLE_NAME,
        PlaceEvaluationNoiseReductionConfig.SIMPLE_NAME,
    ];

    public static readonly concurrencyOracleTypesSimpleNames = [
        NoneOracleConfig.SIMPLE_NAME,
        AlphaOracleConfig.SIMPLE_NAME,
        TimestampOracleConfig.SIMPLE_NAME,
    ];

    public static readonly terminationTypesSimpleNames = [
        LoopBasedTerminationConfig.SIMPLE_NAME,
        EvaluatedPlacesTerminationConfig.SIMPLE_NAME,
        TimeBasedTerminationConfig.SIMPLE_NAME,
    ];

    public static readonly randomPlaceGeneratorTypesSimpleNames = [
        PrimitiveGeneratorConfig.SIMPLE_NAME,
        GeometricDistributionGeneratorConfig.SIMPLE_NAME,
    ];

    @jsonMember(ProcessModelCharacteristicsConfig)
    public processModelCharacteristics: ProcessModelCharacteristicsConfig;

    @jsonMember(NoiseReductionConfig)
    public noiseReduction: NoiseReductionConfig;

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

    @jsonMember(Boolean)
    public isDownloadPetriNetEnabled: boolean;

    @jsonMember(Boolean)
    public isDownloadReportEnabled: boolean;

    constructor(
        processModelCharacteristics: ProcessModelCharacteristicsConfig = new ProcessModelCharacteristicsConfig(),
        noiseReduction: NoiseReductionConfig = new PreprocessingNoiseReductionConfig(),
        concurrencyOracle: ConcurrencyOracleConfig = new TimestampOracleConfig(),
        partialOrderTransformationConfig: PartialOrderTransformationConfig = new PartialOrderTransformationConfig(),
        randomPlaceGenerator: RandomPlaceGeneratorConfig = new GeometricDistributionGeneratorConfig(),
        terminationCondition: TerminationConditionConfig = new TimeBasedTerminationConfig(),
        implicitPlaceIdentification: ImplicitPlaceIdentificationConfig = new ImplicitPlaceIdentificationConfig(),
        isDebugModusEnabled: boolean = RstMinerSettings.DEFAULT_DEBUG_MODUS_ENABLED,
        isDownloadPetriNetEnabled: boolean = RstMinerSettings.DEFAULT_DOWNLOAD_PETRI_NET_ENABLED,
        isDownloadReportEnabled: boolean = RstMinerSettings.DEFAULT_DOWNLOAD_REPORT_ENABLED
    ) {
        this.processModelCharacteristics = processModelCharacteristics;
        this.noiseReduction = noiseReduction;
        this.concurrencyOracle = concurrencyOracle;
        this.partialOrderTransformation = partialOrderTransformationConfig;
        this.randomPlaceGenerator = randomPlaceGenerator;
        this.terminationCondition = terminationCondition;
        this.implicitPlaceIdentification = implicitPlaceIdentification;
        this.isDebugModusEnabled = isDebugModusEnabled;
        this.isDownloadPetriNetEnabled = isDownloadPetriNetEnabled;
        this.isDownloadReportEnabled = isDownloadReportEnabled;
    }
}
