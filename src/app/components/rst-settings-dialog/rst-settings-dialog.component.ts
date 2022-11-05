import {Component} from '@angular/core';
import {RstMinerDataService} from "../../services/data/rst-miner-data.service";
import {MinerSettings} from "../../classes/MinerSettings/miner-settings";
import {LoopBasedTermination, TimeBasedTermination} from "../../classes/MinerSettings/termination-condition";
import {minerSettingsToJson} from "../../classes/MinerSettings/miner-settings-serde-helper";
import { saveAs } from 'file-saver';

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
        this.saveFile(
            minerSettingsToJson(this.rstMinerDataService.minerSettings),
            "application/json;charset=utf-8",
            "json",
            true,
            "rST-Miner-Settings")
    }

    private saveFile(
        fileContent: string,
        fileType: string,
        fileExtension : string,
        dateSuffix: boolean,
        fileName: string
    ) {
        saveAs(
            new Blob([fileContent], { type: fileType }),
            fileName + (dateSuffix ? '_' + new Date().toLocaleString()  : '') + "." + fileExtension
        );
    }
}
