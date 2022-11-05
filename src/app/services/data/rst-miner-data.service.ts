import { Injectable } from '@angular/core';
import { EventLog } from '../../classes/EventLog/eventlog';
import { Event } from '../../classes/EventLog/event';
import {MinerSettings} from "../../classes/MinerSettings/miner-settings";
import {TimeBasedTermination} from "../../classes/MinerSettings/termination-condition";
import {Duration} from "ts-duration";

@Injectable({
    providedIn: 'root',
})
export class RstMinerDataService {

    private _eventLog: EventLog;
    private _minerSettings: MinerSettings;


    constructor() {
        this._eventLog = new EventLog([], [], [], [], []);
        this._minerSettings = new MinerSettings();
    }

    public get eventLog(): EventLog {
        return this._eventLog;
    }

    public set eventLog(value: EventLog) {
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
