import {Component} from '@angular/core';
import {RstMinerDataService} from '../../services/data/rst-miner-data.service';
import {RstMinerSettings} from '../../classes/models/miner-settings/rst-miner-settings';
import {
    LoopBasedTerminationConfig,
    TimeBasedTerminationConfig,
} from '../../classes/models/miner-settings/termination-condition-config';
import {minerSettingsToJson, readAndUseMinerSettingsFile,} from '../../classes/serde/miner-settings-serde-helper';
import {saveAs} from 'file-saver';
import {
    AlphaOracleConfig,
    NoneOracleConfig,
    TimestampOracleConfig
} from "../../classes/models/miner-settings/concurrency-oracle-config";
import {PrimitiveGeneratorConfig} from "../../classes/models/miner-settings/random-place-generator-config";

@Component({
    selector: 'app-rst-settings-dialog',
    templateUrl: './rst-settings-dialog.component.html',
    styleUrls: ['./rst-settings-dialog.component.scss'],
})
export class RstSettingsDialogComponent {
    // Zugriff auf statische Felder aus HTML ermöglichen
    MinerSettings = RstMinerSettings;

    NoneOracle = NoneOracleConfig;
    AlphaOracle = AlphaOracleConfig;
    TimestampOracle = TimestampOracleConfig;

    PrimitiveGenerator = PrimitiveGeneratorConfig;

    LoopBasedTermination = LoopBasedTerminationConfig;
    TimeBasedTermination = TimeBasedTerminationConfig;
    durationTimeUnit: string;

    constructor(public rstMinerDataService: RstMinerDataService) {
        this.durationTimeUnit = TimeBasedTerminationConfig.SECONDS;
    }

    get actTerminationConditionSimpleName(): string {
        return this.rstMinerDataService.minerSettings.terminationCondition.getSimpleName();
    }

    set actTerminationConditionSimpleName(value: string) {
        switch (value) {
            case LoopBasedTerminationConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition =
                    new LoopBasedTerminationConfig();
                break;
            case TimeBasedTerminationConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition =
                    new TimeBasedTerminationConfig();
                break;
        }
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

    get durationAmount(): number {
        return (
            this.rstMinerDataService.minerSettings
                .terminationCondition as TimeBasedTerminationConfig
        ).getDurationIn(this.durationTimeUnit);
    }

    set durationAmount(value: number) {
        (
            this.rstMinerDataService.minerSettings
                .terminationCondition as TimeBasedTerminationConfig
        ).setDurationIn(this.durationTimeUnit, value);
    }


    get actConcurrencyOracleSimpleName(): string {
        return this.rstMinerDataService.minerSettings.concurrencyOracle.getSimpleName();
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
        if (oracle instanceof AlphaOracleConfig || oracle instanceof TimestampOracleConfig) {
            return oracle.distinguishSameEvents;
        }
        throw new Error("Unexpected State!");
    }

    set concurrencyOracleDistinguishSameEvents(value: boolean) {
        const oracle = this.rstMinerDataService.minerSettings.concurrencyOracle;
        if (oracle instanceof AlphaOracleConfig || oracle instanceof TimestampOracleConfig) {
            oracle.distinguishSameEvents = value;
        }
    }

    get actRandomPlaceGeneratorSimpleName(): string {
        return this.rstMinerDataService.minerSettings.randomPlaceGenerator.getSimpleName();
    }

    set actRandomPlaceGeneratorSimpleName(value: string) {
        switch (value) {
            case PrimitiveGeneratorConfig.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.randomPlaceGenerator =
                    new PrimitiveGeneratorConfig();
                break;
        }
    }

    get primitiveGeneratorProbability(): number {
        return (this.rstMinerDataService.minerSettings.randomPlaceGenerator as PrimitiveGeneratorConfig).probability;
    }

    set primitiveGeneratorProbability(value : number) {
        (this.rstMinerDataService.minerSettings.randomPlaceGenerator as PrimitiveGeneratorConfig).probability = value;
    }

    downloadMinerSettingsJsonFile() {
        saveAs(
            new Blob(
                [minerSettingsToJson(this.rstMinerDataService.minerSettings)],
                {type: 'application/json;charset=utf-8'}
            ),
            'rST-Miner-Settings_' + new Date().toLocaleString() + '.json'
        );
    }

    readMinerSettingsFile(file: File) {
        readAndUseMinerSettingsFile(file, this.rstMinerDataService);
    }
}
