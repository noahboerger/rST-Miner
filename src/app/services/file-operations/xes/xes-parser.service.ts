import { Injectable } from '@angular/core';
import { Eventlog } from '../../../classes/models/eventlog/eventlog';
import { XesParser } from '../../../classes/parser/eventlog/xesParser';

@Injectable({
    providedIn: 'root',
})
export class XesParserService {
    private readonly parser = new XesParser();

    constructor() {}

    /**
     * Liest einen String im Xes-Format ein und wandelt es in dieintern verwendete Repräsentation als {@link Eventlog} um
     *
     * @param xmlString String im Xes-Format, der geparst werden soll
     * @return interne Darstellung als {@link Eventlog}
     */
    public parse(xmlString: string): Eventlog {
        return this.parser.parse(xmlString);
    }
}
