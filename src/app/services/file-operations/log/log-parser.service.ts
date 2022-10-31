import { Injectable } from '@angular/core';
import { EventLog } from '../../../classes/EventLog/eventlog';
import { LogParser } from '../../../classes/parser/logParser';

@Injectable({
    providedIn: 'root',
})
export class LogParserService {
    private readonly parser = new LogParser();

    constructor() {}

    /**
     * Liest einen String im .type log Format ein, das von Robin Bergenthum und Jakub Kovar definiert wurde und wandelt es in die
     * intern verwendete Repräsentation als {@link EventLog} um
     *
     * @param text String im .type log Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    public parse(text: string): EventLog {
        return this.parser.parse(text);
    }
}
