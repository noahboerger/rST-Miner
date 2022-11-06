import {Component} from '@angular/core';
import {RstMinerDataService} from '../../services/data/rst-miner-data.service';
import {LogParserService} from '../../services/file-operations/log/log-parser.service';
import {XesParserService} from '../../services/file-operations/xes/xes-parser.service';
import {LoadingService} from '../../services/view/loading/loading.service';
import {LogParser} from '../../classes/parser/eventlog/logParser';
import {XesParser} from '../../classes/parser/eventlog/xesParser';
import {Eventlog} from '../../classes/models/eventlog/eventlog';
import {TypedJSON} from 'typedjson';
import {MatDialog} from '@angular/material/dialog';
import {RstSettingsDialogComponent} from '../rst-settings-dialog/rst-settings-dialog.component';
import {
    minerSettingsToJson,
    readAndUseMinerSettingsFile
} from '../../classes/serde/miner-settings-serde-helper';
import {RstMiner} from "../../classes/algorithms/rst-miner/rstMiner";
import {saveAs} from "file-saver";
import {serialisePetriNet} from "../../classes/serde/petri-net-serialisation";

@Component({
    selector: 'app-rst-miner',
    templateUrl: './rst-miner.component.html',
    styleUrls: ['./rst-miner.component.scss'],
})
export class RstMinerComponent {
    loading$ = this.loader.loading$;

    constructor(
        private dialog: MatDialog,
        public rstMinerDataService: RstMinerDataService,
        private _logParserService: LogParserService,
        private _xesParserService: XesParserService,
        private loadingSpinner: LoadingService,
        public loader: LoadingService
    ) {}

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
                this.rstMinerDataService.eventLog = result;
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
                this.rstMinerDataService.eventLog = result;
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
        return new Promise<Eventlog>((resolve, reject) => {
            if (typeof Worker !== 'undefined') {
                const worker = new Worker(
                    new URL('../../workers/log-parser.worker', import.meta.url)
                );
                worker.onmessage = ({ data }) => {
                    if (data == null) {
                        reject(LogParser.PARSING_ERROR);
                    }
                    const serializer = new TypedJSON(Eventlog);
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
        return new Promise<Eventlog>((resolve, reject) => {
            if (typeof Worker !== 'undefined') {
                const worker = new Worker(
                    new URL('../../workers/xes-parser.worker', import.meta.url)
                );
                worker.onmessage = ({ data }) => {
                    if (data == null) {
                        reject(XesParser.PARSING_ERROR);
                    }
                    const serializer = new TypedJSON(Eventlog);
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

    hoverStart(e: MouseEvent) {
        this.prevent(e);
        const target = e.target as HTMLElement;
        target.classList.add('mouse-hover');
    }

    hoverEnd(e: MouseEvent) {
        this.prevent(e);
        const target = e.target as HTMLElement;
        target.classList.remove('mouse-hover');
    }

    prevent(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    openMinerSettingsDialog() {
        const dialogRef = this.dialog.open(RstSettingsDialogComponent);

        dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
        });
    }

    readMinerSettingsFile(file: File) {
        readAndUseMinerSettingsFile(file, this.rstMinerDataService);
    }

    executeRstMiningAndDownloadResult(e: MouseEvent) {// TODO wieder umstellen auf Webworker, sobald es funktioniert (Verwendung hier nur zum debuggen)
        const resultingPetriNet = new RstMiner(this.rstMinerDataService.minerSettings, this.rstMinerDataService.eventLog).mine();
        const serialised = serialisePetriNet(resultingPetriNet);
        saveAs(new Blob([serialised], {type: 'text/plain;charset=utf-8'}),
                        'model_' + new Date().toLocaleString() + '.pn'
                    );
    }

    // executeRstMiningAndDownloadResult(e: MouseEvent) {
    //     this.loadingSpinner.show();
    //     this.executeRstMiningAndGetResult()
    //         .then(result => {
    //             saveAs(new Blob([result], {type: 'text/plain;charset=utf-8'}),
    //                 'model_' + new Date().toLocaleString() + '.pn'
    //             );
    //         })
    //         .catch(reason => {
    //             let message;
    //             if (reason === RstMiner.MINING_ERROR) {
    //                 message =
    //                     'An error occurred when executing the rST-Mining algorithm.\n' +
    //                     'Check the uploaded log- and settings-file for valid syntax and try again.';
    //             } else {
    //                 message =
    //                     'Unexpected error occurred when executing the rST-Mining algorithm.';
    //             }
    //             alert(message);
    //         })
    //         .finally(() => this.loadingSpinner.hide());
    // }
    //
    // private executeRstMiningAndGetResult() {
    //     return new Promise<string>((resolve, reject) => {
    //         if (typeof Worker !== 'undefined') {
    //             const worker = new Worker(
    //                 new URL('../../workers/rst-miner.worker', import.meta.url)
    //             );
    //             worker.onmessage = ({data}) => {
    //                 if (data == null) {
    //                     reject(RstMiner.MINING_ERROR);
    //                 }
    //                 // TODO Idee aktuell: worker serialisiert bereits, dass wird dann in eine Datei geschrieben
    //                 resolve(data);
    //             };
    //             worker.onerror = event => {
    //                 event.preventDefault();
    //                 reject(RstMiner.MINING_ERROR);
    //             };
    //             const minerSettingsSerialised = minerSettingsToJson(this.rstMinerDataService.minerSettings)
    //             const eventlogSerialised = new TypedJSON(Eventlog).stringify(this.rstMinerDataService.eventLog);
    //             worker.postMessage([minerSettingsSerialised, eventlogSerialised]); // TODO postSetting and log
    //         } else {
    //             // web worker not available, fallback option
    //             try {
    //                 // const result = this._xesParserService.parse(fileContent); TODO
    //                 resolve("web worker not available todo"); // TODO
    //             } catch (e) {
    //                 reject(e);
    //             }
    //         }
    //     });
    // }
}
