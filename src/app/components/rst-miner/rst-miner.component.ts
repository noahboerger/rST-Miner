import { Component, OnInit } from '@angular/core';
import {EventlogDataService} from "../../services/data/eventlog-data.service";
import {LogParserService} from "../../services/file-operations/log/log-parser.service";
import {XesParserService} from "../../services/file-operations/xes/xes-parser.service";
import {LoadingService} from "../../services/view/loading/loading.service";
import {LogParser} from "../../classes/parser/logParser";
import {XesParser} from "../../classes/parser/xesParser";
import {EventLog} from "../../classes/EventLog/eventlog";
import {TypedJSON} from "typedjson";

@Component({
  selector: 'app-rst-miner',
  templateUrl: './rst-miner.component.html',
  styleUrls: ['./rst-miner.component.scss']
})
export class RstMinerComponent {

    loading$ = this.loader.loading$;

    constructor(
        private _eventlogDataService: EventlogDataService,
        private _logParserService: LogParserService,
        private _xesParserService: XesParserService,
        private loadingSpinner: LoadingService,
        public loader: LoadingService) {
    }

    processImport([fileExtension, fileContent]: [string, string]) {
        if (['log', 'txt'].includes(fileExtension)) {
            this.processLogImport(fileContent);
        } else if ('xes' === fileExtension) {
            this.processXesImport(fileContent);
        } else {
            alert(
                'The current filetype ' +
                fileExtension +
                ' can not be imported!'
            );
        }
    }

    async processLogImport(fileContent: string) {
        this.loadingSpinner.show();
        this.parseLogFile(fileContent)
            .then(result => {
                this._eventlogDataService.eventLog = result;
                // this.updateTextarea(fileContent, false);
                // this.updateViews(); TODO updates needed?
            })
            .catch(reason => {
                let message;
                if (reason === LogParser.PARSING_ERROR) {
                    message =
                        'The uploaded .log file could not be parsed.\n' +
                        'Check the file for valid .log syntax and try again.';
                } else {
                    message =
                        'Unexpected error occurred when parsing given .log file';
                }
                alert(message);
            })
            .finally(() => {
                this.loadingSpinner.hide();
            });
    }

    async processXesImport(fileContent: string) {
        this.loadingSpinner.show();
        this.parseXesFile(fileContent)
            .then(result => {
                this._eventlogDataService.eventLog = result;
                // this.updateTextarea(this._logService.generate(result), false);
                // this.updateViews(); TODO updates needed?
            })
            .catch(reason => {
                let message;
                if (reason === XesParser.PARSING_ERROR) {
                    message =
                        'The uploaded XES file could not be parsed.\n' +
                        'Check the file for valid XES syntax and try again.';
                } else {
                    message =
                        'Unexpected error occurred when parsing given XES file';
                }
                alert(message);
            })
            .finally(() => this.loadingSpinner.hide());
    }

    parseLogFile(fileContent: string) {
        return new Promise<EventLog>((resolve, reject) => {
            if (typeof Worker !== 'undefined') {
                const worker = new Worker(
                    new URL('../../workers/log-parser.worker', import.meta.url)
                );
                worker.onmessage = ({data}) => {
                    if (data == null) {
                        reject(LogParser.PARSING_ERROR);
                    }
                    const serializer = new TypedJSON(EventLog);
                    const result = serializer.parse(data);
                    if (result != undefined) {
                        resolve(result);
                    } else {
                        reject(LogParser.PARSING_ERROR);
                    }
                };
                worker.onerror = event => {
                    event.preventDefault();
                    reject(LogParser.PARSING_ERROR);
                };
                worker.postMessage(fileContent);
            } else {
                // web worker not available, fallback option
                try {
                    const result = this._logParserService.parse(fileContent);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }
        });
    }

    parseXesFile(fileContent: string) {
        return new Promise<EventLog>((resolve, reject) => {
            if (typeof Worker !== 'undefined') {
                const worker = new Worker(
                    new URL('../../workers/xes-parser.worker', import.meta.url)
                );
                worker.onmessage = ({data}) => {
                    if (data == null) {
                        reject(XesParser.PARSING_ERROR);
                    }
                    const serializer = new TypedJSON(EventLog);
                    const result = serializer.parse(data);
                    if (result != undefined) {
                        resolve(result);
                    } else {
                        reject(XesParser.PARSING_ERROR);
                    }
                };
                worker.onerror = event => {
                    event.preventDefault();
                    reject(XesParser.PARSING_ERROR);
                };
                worker.postMessage(fileContent);
            } else {
                // web worker not available, fallback option
                try {
                    const result = this._xesParserService.parse(fileContent);
                    resolve(result);
                } catch (e) {
                    reject(e);
                }
            }
        });
    }

}
