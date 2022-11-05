import {Component} from '@angular/core';
import {RstMinerDataService} from "../../services/data/rst-miner-data.service";
import {MinerSettings} from "../../classes/MinerSettings/minersettings";
import {LoopBasedTermination, TimeBasedTermination} from "../../classes/MinerSettings/terminationcondition";

@Component({
    selector: 'app-rst-settings-dialog',
    templateUrl: './rst-settings-dialog.component.html',
    styleUrls: ['./rst-settings-dialog.component.scss']
})
export class RstSettingsDialogComponent {
    // TODO download- und upload der settings, rest to Default

    // Zugriff auf statische Felder aus HTML ermöglichen
    minerSettingsInstance = MinerSettings;
    loopBasedTermination = LoopBasedTermination;
    timeBasedTermination = TimeBasedTermination;



    constructor(public _rstMinerDataService: RstMinerDataService) {
    }

    get actTerminationConditionSimpleName(): string {
        return this._rstMinerDataService.minerSettings.terminationCondition.getSimpleName();
    }

    set actTerminationConditionSimpleName(value: string) {
        switch (value) {
            case LoopBasedTermination.SIMPLE_NAME:
                this._rstMinerDataService.minerSettings.terminationCondition = new LoopBasedTermination();
                break;
            case TimeBasedTermination.SIMPLE_NAME:
                this._rstMinerDataService.minerSettings.terminationCondition = new TimeBasedTermination();
                break;
        }
    }
}