import { Injectable } from '@angular/core';
import { EventLog } from '../../../classes/EventLog/eventlog';
import { XesParser } from '../../../classes/parser/xesParser';

@Injectable({
    providedIn: 'root',
})
export class XesParserService {
    private readonly parser = new XesParser();

    constructor() {}

    /**
     * Liest einen String im Xes-Format ein und wandelt es in dieintern verwendete Repräsentation als {@link EventLog} um
     *
     * @param xmlString String im Xes-Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    public parse(xmlString: string): EventLog {
        return this.parser.parse(xmlString);
    }
}
