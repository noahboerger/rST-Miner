import { Injectable } from '@angular/core';
import { EventLog } from '../../classes/EventLog/eventlog';
import { Event } from '../../classes/EventLog/event';

@Injectable({
    providedIn: 'root',
})
export class EventlogDataService {
    private _eventLog: EventLog;


    constructor() {
        this._eventLog = new EventLog([], [], [], [], []);
    }

    public get eventLog(): EventLog {
        return this._eventLog;
    }

    public set eventLog(value: EventLog) {
        this._eventLog = value;
    }
}
