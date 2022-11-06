import { Injectable } from '@angular/core';
import { Eventlog } from '../../classes/eventlog/eventlog';
import { Event } from '../../classes/eventlog/event';
import {MinerSettings} from "../../classes/miner-settings/miner-settings";
import {TimeBasedTermination} from "../../classes/miner-settings/termination-condition";
import {Duration} from "ts-duration";

@Injectable({
    providedIn: 'root',
})
export class RstMinerDataService {

    private _eventLog: Eventlog;
    private _minerSettings: MinerSettings;


    constructor() {
        this._eventLog = new Eventlog([], [], [], [], []);
        this._minerSettings = new MinerSettings();
    }

    public get eventLog(): Eventlog {
        return this._eventLog;
    }

    public set eventLog(value: Eventlog) {
        this._eventLog = value;
    }

    public get minerSettings(): MinerSettings {
        return this._minerSettings;
    }

    public set minerSettings(value: MinerSettings) {
        this._minerSettings = value;
    }

    public resetMinerSettingsToDefault() {
        this.minerSettings = new MinerSettings();
    }
}
