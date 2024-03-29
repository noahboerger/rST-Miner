import { Component } from '@angular/core';
import { RstMinerDataService } from '../../services/data/rst-miner-data.service';
import { RstMinerSettings } from '../../classes/models/miner-settings/rst-miner-settings';
import {
    EvaluatedPlacesTerminationConfig,
    LoopBasedTerminationConfig,
    PetriNetStateReachedTerminationConfig,
    TimeBasedTerminationConfig,
} from '../../classes/models/miner-settings/termination-condition-config';
import {
    minerSettingsToJson,
    readAndUseMinerSettingsFile,
} from '../../classes/serde/miner-settings-serde-helper';
import { saveAs } from 'file-saver';
import {
    AlphaOracleConfig,
    NoneOracleConfig,
    TimestampOracleConfig,
} from '../../classes/models/miner-settings/concurrency-oracle-config';
import {
    GeometricDistributionGeneratorConfig,
    PrimitiveGeneratorConfig,
} from '../../classes/models/miner-settings/random-place-generator-config';
import { ImplicitPlaceIdentificationConfig } from '../../classes/models/miner-settings/implicit-place-identification-config';
import {
    NoNoiseReductionConfig,
    PlaceEvaluationNoiseReductionConfig,
    PreprocessingNoiseReductionConfig,
} from '../../classes/models/miner-settings/noise-reduction-config';
import {
    allStandardProcessModelNetTypeEnumValues,
    fromString,
    StandardProcessModelNetType,
    toString,
} from '../../classes/models/miner-settings/standard-pm-nets/standard-process-model-net-type';

@Component({
    selector: 'app-rst-settings-dialog',
    templateUrl: './rst-settings-dialog.component.html',
    styleUrls: ['./rst-settings-dialog.component.scss'],
})
export class RstSettingsDialogComponent {
    // Zugriff auf statische Felder aus HTML ermöglichen
    readonly MinerSettings = RstMinerSettings;

    readonly NoNoiseReductionConfig = NoNoiseReductionConfig;
    readonly PreprocessingNoiseReductionConfig =
        PreprocessingNoiseReductionConfig;
    readonly PlaceEvaluationNoiseReductionConfig =
        PlaceEvaluationNoiseReductionConfig;

    readonly NoneOracle = NoneOracleConfig;
    readonly AlphaOracle = AlphaOracleConfig;
    readonly TimestampOracle = TimestampOracleConfig;

    readonly PrimitiveGenerator = PrimitiveGeneratorConfig;
    readonly GeometricDistributionGeneratorConfig =
        GeometricDistributionGeneratorConfig;

    readonly LoopBasedTermination = LoopBasedTerminationConfig;
    readonly EvaluatedPlacesTerminationConfig =
        EvaluatedPlacesTerminationConfig;
    readonly TimeBasedTermination = TimeBasedTerminationConfig;
    readonly PetriNetStateReachedTerminationConfig =
        PetriNetStateReachedTerminationConfig;
    readonly standardProcessModelNetTypeStringValues =
        allStandardProcessModelNetTypeEnumValues().map(enumType =>
            toString(enumType)
        );

    readonly ImplicitPlaceIdentificationConfig =
        ImplicitPlaceIdentificationConfig;

    durationTimeUnit: string;

    constructor(public rstMinerDataService: RstMinerDataService) {
        this.durationTimeUnit = TimeBasedTerminationConfig.SECONDS;
    }

    get actNoiseReductionSimpleName(): string {
        return this.rstMinerDataService.minerSettings.noiseReduction.simpleName;
    }

    set actNoiseReductionSimpleName(value: string) {
        switch (value) {
            case NoNoiseReductionConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.noiseReduction =
                    new NoNoiseReductionConfig();
                break;
            case PreprocessingNoiseReductionConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.noiseReduction =
                    new PreprocessingNoiseReductionConfig();
                break;
            case PlaceEvaluationNoiseReductionConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.noiseReduction =
                    new PlaceEvaluationNoiseReductionConfig();
                break;
        }
    }

    set preprocessingNoiseReductionFittingProportion(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .noiseReduction as PreprocessingNoiseReductionConfig
        ).fittingProportion = value;
    }

    get preprocessingNoiseReductionFittingProportion(): number {
        return (
            this.rstMinerDataService.minerSettings
                .noiseReduction as PreprocessingNoiseReductionConfig
        ).fittingProportion;
    }

    set placeEvaluationNoiseReductionFittingProportion(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .noiseReduction as PlaceEvaluationNoiseReductionConfig
        ).fittingProportion = value;
    }

    get placeEvaluationNoiseReductionFittingProportion(): number {
        return (
            this.rstMinerDataService.minerSettings
                .noiseReduction as PlaceEvaluationNoiseReductionConfig
        ).fittingProportion;
    }

    get actTerminationConditionSimpleName(): string {
        return this.rstMinerDataService.minerSettings.terminationCondition
            .simpleName;
    }

    set actTerminationConditionSimpleName(value: string) {
        switch (value) {
            case LoopBasedTerminationConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition =
                    new LoopBasedTerminationConfig();
                break;
            case EvaluatedPlacesTerminationConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition =
                    new EvaluatedPlacesTerminationConfig();
                break;
            case TimeBasedTerminationConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition =
                    new TimeBasedTerminationConfig();
                break;
            case PetriNetStateReachedTerminationConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition =
                    new PetriNetStateReachedTerminationConfig();
                break;
        }
    }

    get terminationNoChangeSinceEnabledCheckboxDisabled() {
        return (
            this.rstMinerDataService.minerSettings
                .terminationCondition instanceof
            PetriNetStateReachedTerminationConfig
        );
    }

    get terminationNoChangeSinceEnabled(): boolean {
        if (
            this.rstMinerDataService.minerSettings
                .terminationCondition instanceof
            PetriNetStateReachedTerminationConfig
        ) {
            return false;
        }
        return this.rstMinerDataService.minerSettings.terminationCondition
            .noChangeSinceEnabled;
    }

    set terminationNoChangeSinceEnabled(value: boolean) {
        this.rstMinerDataService.minerSettings.terminationCondition.noChangeSinceEnabled =
            value;
    }

    get loopTerminationIterations(): number {
        return (
            this.rstMinerDataService.minerSettings
                .terminationCondition as LoopBasedTerminationConfig
        ).loopAmount;
    }

    set loopTerminationIterations(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .terminationCondition as LoopBasedTerminationConfig
        ).loopAmount = value;
    }

    get placeEvaluationTerminationAmount(): number {
        return (
            this.rstMinerDataService.minerSettings
                .terminationCondition as EvaluatedPlacesTerminationConfig
        ).amountOfEvaluatedPlaces;
    }

    set placeEvaluationTerminationAmount(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .terminationCondition as EvaluatedPlacesTerminationConfig
        ).amountOfEvaluatedPlaces = value;
    }

    get timeTerminationDuration(): number {
        return (
            this.rstMinerDataService.minerSettings
                .terminationCondition as TimeBasedTerminationConfig
        ).getDurationIn(this.durationTimeUnit);
    }

    set timeTerminationDuration(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .terminationCondition as TimeBasedTerminationConfig
        ).setDurationIn(this.durationTimeUnit, value);
    }

    get petriNetStateTerminationStandardProcessModelNetTypeStringValue() {
        return toString(
            (
                this.rstMinerDataService.minerSettings
                    .terminationCondition as PetriNetStateReachedTerminationConfig
            ).standardProcessModelNetType
        );
    }

    set petriNetStateTerminationStandardProcessModelNetTypeStringValue(
        value: string
    ) {
        (
            this.rstMinerDataService.minerSettings
                .terminationCondition as PetriNetStateReachedTerminationConfig
        ).standardProcessModelNetType = fromString(value);
    }

    get petriNetStateTerminationPetriNetString() {
        return (
            this.rstMinerDataService.minerSettings
                .terminationCondition as PetriNetStateReachedTerminationConfig
        ).petriNetStringRepresentation;
    }

    set petriNetStateTerminationPetriNetString(value: string) {
        (
            this.rstMinerDataService.minerSettings
                .terminationCondition as PetriNetStateReachedTerminationConfig
        ).petriNetStringRepresentation = value;
    }

    get petriNetStateTerminationPetriNetStringFieldDisabled() {
        return (
            (
                this.rstMinerDataService.minerSettings
                    .terminationCondition as PetriNetStateReachedTerminationConfig
            ).standardProcessModelNetType !==
            StandardProcessModelNetType.USER_DEFINED
        );
    }

    get actConcurrencyOracleSimpleName(): string {
        return this.rstMinerDataService.minerSettings.concurrencyOracle
            .simpleName;
    }

    set actConcurrencyOracleSimpleName(value: string) {
        switch (value) {
            case NoneOracleConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.concurrencyOracle =
                    new NoneOracleConfig();
                break;
            case AlphaOracleConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.concurrencyOracle =
                    new AlphaOracleConfig();
                break;
            case TimestampOracleConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.concurrencyOracle =
                    new TimestampOracleConfig();
                break;
        }
    }

    get alphaOracleLookAheadDistance(): number {
        return (
            this.rstMinerDataService.minerSettings
                .concurrencyOracle as AlphaOracleConfig
        ).lookAheadDistance;
    }

    set alphaOracleLookAheadDistance(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .concurrencyOracle as AlphaOracleConfig
        ).lookAheadDistance = value;
    }

    get concurrencyOracleDistinguishSameEvents(): boolean {
        const oracle = this.rstMinerDataService.minerSettings.concurrencyOracle;
        if (
            oracle instanceof AlphaOracleConfig ||
            oracle instanceof TimestampOracleConfig ||
            oracle instanceof NoneOracleConfig
        ) {
            return oracle.distinguishSameEvents;
        }
        throw new Error('Unexpected State!');
    }

    set concurrencyOracleDistinguishSameEvents(value: boolean) {
        const oracle = this.rstMinerDataService.minerSettings.concurrencyOracle;
        if (
            oracle instanceof AlphaOracleConfig ||
            oracle instanceof TimestampOracleConfig ||
            oracle instanceof NoneOracleConfig
        ) {
            oracle.distinguishSameEvents = value;
        }
    }

    get actRandomPlaceGeneratorSimpleName(): string {
        return this.rstMinerDataService.minerSettings.randomPlaceGenerator
            .simpleName;
    }

    set actRandomPlaceGeneratorSimpleName(value: string) {
        switch (value) {
            case PrimitiveGeneratorConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.randomPlaceGenerator =
                    new PrimitiveGeneratorConfig();
                break;
            case GeometricDistributionGeneratorConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.randomPlaceGenerator =
                    new GeometricDistributionGeneratorConfig();
                break;
        }
    }

    get primitiveGeneratorMaximalInitialMarking(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).maximalInitialMarking;
    }

    set primitiveGeneratorMaximalInitialMarking(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).maximalInitialMarking = value;
    }

    get primitiveGeneratorIngoingProbability(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).ingoingConnectionProbability;
    }

    set primitiveGeneratorIngoingProbability(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).ingoingConnectionProbability = value;
    }

    get primitiveGeneratorOutgoingProbability(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).outgoingConnectionProbability;
    }

    set primitiveGeneratorOutgoingProbability(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).outgoingConnectionProbability = value;
    }

    get primitiveGeneratorMaximalIngoingArcWeights(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).maximalIngoingArcWeights;
    }

    set primitiveGeneratorMaximalIngoingArcWeights(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).maximalIngoingArcWeights = value;
    }

    get primitiveGeneratorMaximalOutgoingArcWeights(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).maximalOutgoingArcWeights;
    }

    set primitiveGeneratorMaximalOutgoingArcWeights(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as PrimitiveGeneratorConfig
        ).maximalOutgoingArcWeights = value;
    }

    get geometricDistributionGeneratorMaximalInitialMarking(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).maximalInitialMarking;
    }

    set geometricDistributionGeneratorMaximalInitialMarking(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).maximalInitialMarking = value;
    }

    get geometricDistributionGeneratorGeometricIncreaseInitialMarkingProbability(): number {
        if (this.geometricDistributionGeneratorMaximalInitialMarking === 0) {
            return 0;
        }
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).geometricIncreaseInitialMarkingProbability;
    }

    set geometricDistributionGeneratorGeometricIncreaseInitialMarkingProbability(
        value: number
    ) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).geometricIncreaseInitialMarkingProbability = value;
    }

    get geometricDistributionGeneratorGeometricIncreaseArcsProbability(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).geometricIncreaseArcsProbability;
    }

    set geometricDistributionGeneratorGeometricIncreaseArcsProbability(
        value: number
    ) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).geometricIncreaseArcsProbability = value;
    }

    get geometricDistributionGeneratorMaximalIngoingArcWeights(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).maximalIngoingArcWeights;
    }

    set geometricDistributionGeneratorMaximalIngoingArcWeights(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).maximalIngoingArcWeights = value;
    }

    get geometricDistributionGeneratorMaximalOutgoingArcWeights(): number {
        return (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).maximalOutgoingArcWeights;
    }

    set geometricDistributionGeneratorMaximalOutgoingArcWeights(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .randomPlaceGenerator as GeometricDistributionGeneratorConfig
        ).maximalOutgoingArcWeights = value;
    }

    downloadMinerSettingsJsonFile() {
        saveAs(
            new Blob(
                [minerSettingsToJson(this.rstMinerDataService.minerSettings)],
                { type: 'application/json;charset=utf-8' }
            ),
            'rST-Miner-Settings_' + new Date().toLocaleString() + '.json'
        );
    }

    readMinerSettingsFile(file: File) {
        readAndUseMinerSettingsFile(file, this.rstMinerDataService);
    }
}
