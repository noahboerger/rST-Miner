import { Injectable } from '@angular/core';
import { Eventlog } from '../../classes/models/eventlog/eventlog';
import { RstMinerSettings } from '../../classes/models/miner-settings/rst-miner-settings';

@Injectable({
    providedIn: 'root',
})
export class RstMinerDataService {
    private _eventLog: Eventlog;
    private _minerSettings: RstMinerSettings;

    constructor() {
        this._eventLog = new Eventlog([], [], [], [], []);
        this._minerSettings = new RstMinerSettings();
    }

    public get eventLog(): Eventlog {
        return this._eventLog;
    }

    public set eventLog(value: Eventlog) {
        this._eventLog = value;
    }

    public get minerSettings(): RstMinerSettings {
        return this._minerSettings;
    }

    public set minerSettings(value: RstMinerSettings) {
        this._minerSettings = value;
    }

    public resetMinerSettingsToDefault() {
        this.minerSettings = new RstMinerSettings();
    }
}
