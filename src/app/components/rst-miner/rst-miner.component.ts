import { Component } from '@angular/core';
import { RstMinerDataService } from '../../services/data/rst-miner-data.service';
import { LogParserService } from '../../services/file-operations/log/log-parser.service';
import { XesParserService } from '../../services/file-operations/xes/xes-parser.service';
import { LoadingService } from '../../services/view/loading/loading.service';
import { LogParser } from '../../classes/parser/eventlog/logParser';
import { XesParser } from '../../classes/parser/eventlog/xesParser';
import { Eventlog } from '../../classes/models/eventlog/eventlog';
import { TypedJSON } from 'typedjson';
import { MatDialog } from '@angular/material/dialog';
import { RstSettingsDialogComponent } from '../rst-settings-dialog/rst-settings-dialog.component';
import {
    minerSettingsToJson,
    readAndUseMinerSettingsFile,
} from '../../classes/serde/miner-settings-serde-helper';
import { RstMiner } from '../../classes/algorithms/rst-miner/rst-miner';
import { saveAs } from 'file-saver';
import { serialisePetriNet } from '../../classes/serde/petri-net-serialisation';
import { SerializableStringPair } from '../../classes/models/utils/serializable-string-pair';

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
        // web worker not available, fallback option
        if (
            typeof Worker === 'undefined' ||
            this.rstMinerDataService.minerSettings.isDebugModusEnabled
        ) {
            try {
                this.rstMinerDataService.eventLog =
                    this._logParserService.parse(fileContent);
            } catch (e) {
                RstMinerComponent.handleParsingError(
                    e,
                    LogParser.PARSING_ERROR,
                    '.log'
                );
            }
        } else {
            this.loadingSpinner.show();
            this.parseLogFile(fileContent)
                .then(result => (this.rstMinerDataService.eventLog = result))
                .catch(reason =>
                    RstMinerComponent.handleParsingError(
                        reason,
                        LogParser.PARSING_ERROR,
                        '.log'
                    )
                )
                .finally(() => this.loadingSpinner.hide());
        }
    }

    private parseLogFile(fileContent: string) {
        return new Promise<Eventlog>((resolve, reject) => {
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
        });
    }

    async processXesImport(fileContent: string) {
        // web worker not available, fallback option
        if (
            typeof Worker === 'undefined' ||
            this.rstMinerDataService.minerSettings.isDebugModusEnabled
        ) {
            try {
                this.rstMinerDataService.eventLog =
                    this._xesParserService.parse(fileContent);
            } catch (e) {
                RstMinerComponent.handleParsingError(
                    e,
                    XesParser.PARSING_ERROR,
                    'XES'
                );
            }
        } else {
            this.loadingSpinner.show();
            this.parseXesFile(fileContent)
                .then(result => (this.rstMinerDataService.eventLog = result))
                .catch(reason =>
                    RstMinerComponent.handleParsingError(
                        reason,
                        XesParser.PARSING_ERROR,
                        'XES'
                    )
                )
                .finally(() => this.loadingSpinner.hide());
        }
    }

    private parseXesFile(fileContent: string) {
        return new Promise<Eventlog>((resolve, reject) => {
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
        });
    }

    async processRstMiningAndDownloadResult() {
        // web worker not available, fallback option
        if (
            typeof Worker === 'undefined' ||
            this.rstMinerDataService.minerSettings.isDebugModusEnabled
        ) {
            try {
                const rstMiner = new RstMiner(
                    this.rstMinerDataService.minerSettings
                );
                const rstMinerResult = rstMiner.mine(
                    this.rstMinerDataService.eventLog
                );

                const downloadTimeString = new Date().toLocaleString();
                if (
                    this.rstMinerDataService.minerSettings
                        .isDownloadPetriNetEnabled
                ) {
                    const petriNetResult = serialisePetriNet(
                        rstMinerResult.petriNet
                    );
                    saveAs(
                        new Blob([petriNetResult], {
                            type: 'text/plain;charset=utf-8',
                        }),
                        'model_' + downloadTimeString + '.pn'
                    );
                }
                if (
                    this.rstMinerDataService.minerSettings
                        .isDownloadReportEnabled
                ) {
                    const reportResult =
                        rstMinerResult.rstMinerReport.toFormattedString();
                    saveAs(
                        new Blob([reportResult], {
                            type: 'text/plain;charset=utf-8',
                        }),
                        'report_' + downloadTimeString + '.txt'
                    );
                }
            } catch (e) {
                RstMinerComponent.handleRstMiningException(e);
            }
        } else {
            this.loadingSpinner.show();
            this.executeRstMiningAndGetResult()
                .then(petriNetReportStringPair => {
                    const downloadTimeString = new Date().toLocaleString();
                    if (
                        this.rstMinerDataService.minerSettings
                            .isDownloadPetriNetEnabled
                    ) {
                        saveAs(
                            new Blob([petriNetReportStringPair.left], {
                                type: 'text/plain;charset=utf-8',
                            }),
                            'model_' + downloadTimeString + '.pn'
                        );
                    }
                    if (
                        this.rstMinerDataService.minerSettings
                            .isDownloadReportEnabled
                    ) {
                        saveAs(
                            new Blob([petriNetReportStringPair.right], {
                                type: 'text/plain;charset=utf-8',
                            }),
                            'report_' + downloadTimeString + '.txt'
                        );
                    }
                })
                .catch(reason => {
                    RstMinerComponent.handleRstMiningException(reason);
                })
                .finally(() => this.loadingSpinner.hide());
        }
    }

    private executeRstMiningAndGetResult() {
        return new Promise<SerializableStringPair>((resolve, reject) => {
            const worker = new Worker(
                new URL('../../workers/rst-miner.worker', import.meta.url)
            );
            worker.onmessage = ({ data }) => {
                if (data == null) {
                    reject(RstMiner.MINING_ERROR);
                }
                const resultStringPair = new TypedJSON(
                    SerializableStringPair
                ).parse(data);
                if (resultStringPair != null) {
                    resolve(resultStringPair);
                } else {
                    reject(RstMiner.MINING_ERROR);
                }
            };
            worker.onerror = event => {
                event.preventDefault();
                reject(RstMiner.MINING_ERROR);
            };
            const minerSettingsSerialised = minerSettingsToJson(
                this.rstMinerDataService.minerSettings
            );
            const eventlogSerialised = new TypedJSON(Eventlog).stringify(
                this.rstMinerDataService.eventLog
            );
            worker.postMessage([minerSettingsSerialised, eventlogSerialised]);
        });
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

    hoverStart(e: MouseEvent) {
        RstMinerComponent.prevent(e);
        const target = e.target as HTMLElement;
        target.classList.add('mouse-hover');
    }

    hoverEnd(e: MouseEvent) {
        RstMinerComponent.prevent(e);
        const target = e.target as HTMLElement;
        target.classList.remove('mouse-hover');
    }

    private static prevent(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    private static handleParsingError(
        reason: any,
        expectedReason: Error,
        filetype: string
    ) {
        let message;
        if (reason === expectedReason) {
            message =
                'The uploaded ' +
                filetype +
                ' file could not be parsed.\n' +
                'Check the file for valid ' +
                filetype +
                ' syntax and try again.';
        } else {
            message =
                'Unexpected error occurred when parsing given ' +
                filetype +
                ' file';
        }
        alert(message);
    }

    private static handleRstMiningException(reason: any) {
        let message;
        if (reason === RstMiner.MINING_ERROR) {
            message =
                'An error occurred when executing the rST-Mining algorithm.\n' +
                'Check the uploaded log- and settings-file for valid syntax and try again.';
        } else {
            message =
                'Unexpected error occurred when executing the rST-Mining algorithm.';
        }
        alert(message);
    }
}
