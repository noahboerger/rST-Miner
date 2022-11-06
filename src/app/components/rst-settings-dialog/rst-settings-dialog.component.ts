import {Component} from '@angular/core';
import {RstMinerDataService} from "../../services/data/rst-miner-data.service";
import {MinerSettings} from "../../classes/miner-settings/miner-settings";
import {LoopBasedTermination, TimeBasedTermination} from "../../classes/miner-settings/termination-condition";
import {minerSettingsToJson, readAndUseMinerSettingsFile} from "../../classes/miner-settings/miner-settings-serde-helper";
import {saveAs} from 'file-saver';

@Component({
    selector: 'app-rst-settings-dialog',
    templateUrl: './rst-settings-dialog.component.html',
    styleUrls: ['./rst-settings-dialog.component.scss']
})
export class RstSettingsDialogComponent {

    // TODO download- und upload der settings

    // Zugriff auf statische Felder aus HTML ermöglichen
    MinerSettings = MinerSettings;
    LoopBasedTermination = LoopBasedTermination;
    TimeBasedTermination = TimeBasedTermination;
    durationTimeUnit: string;

    constructor(public rstMinerDataService: RstMinerDataService) {
        this.durationTimeUnit = TimeBasedTermination.SECONDS;
    }

    get actTerminationConditionSimpleName(): string {
        return this.rstMinerDataService.minerSettings.terminationCondition.getSimpleName();
    }

    set actTerminationConditionSimpleName(value: string) {
        switch (value) {
            case LoopBasedTermination.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition = new LoopBasedTermination();
                break;
            case TimeBasedTermination.SIMPLE_NAME:
                this.rstMinerDataService.minerSettings.terminationCondition = new TimeBasedTermination();
                break;
        }
    }

    get loopTerminationIterations(): number {
        return (this.rstMinerDataService.minerSettings.terminationCondition as LoopBasedTermination).loopAmount;
    }

    set loopTerminationIterations(value: number) {
        (this.rstMinerDataService.minerSettings.terminationCondition as LoopBasedTermination).loopAmount = value;
    }

    get durationAmount(): number {
        return (this.rstMinerDataService.minerSettings.terminationCondition as TimeBasedTermination).getDurationIn(this.durationTimeUnit);
    }

    set durationAmount(value: number) {
        (this.rstMinerDataService.minerSettings.terminationCondition as TimeBasedTermination).setDurationIn(this.durationTimeUnit, value);
    }

    downloadMinerSettingsJsonFile() {
        saveAs(
            new Blob([minerSettingsToJson(this.rstMinerDataService.minerSettings)], {type: "application/json;charset=utf-8"}),
            "rST-Miner-Settings" + '_' + new Date().toLocaleString() + "." + "json"
        );
    }

    readMinerSettingsFile(file: File) {
        readAndUseMinerSettingsFile(file, this.rstMinerDataService)
    }
}
