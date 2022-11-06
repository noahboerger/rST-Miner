import { Injectable } from '@angular/core';
import { Eventlog } from '../../../classes/models/eventlog/eventlog';
import { LogParser } from '../../../classes/parser/eventlog/logParser';

@Injectable({
    providedIn: 'root',
})
export class LogParserService {
    private readonly parser = new LogParser();

    constructor() {}

    /**
     * Liest einen String im .type log Format ein, das von Robin Bergenthum und Jakub Kovar definiert wurde und wandelt es in die
     * intern verwendete Repräsentation als {@link Eventlog} um
     *
     * @param text String im .type log Format, der geparst werden soll
     * @return interne Darstellung als {@link Eventlog}
     */
    public parse(text: string): Eventlog {
        return this.parser.parse(text);
    }
}
