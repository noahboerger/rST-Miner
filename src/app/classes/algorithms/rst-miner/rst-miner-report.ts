import { Duration } from 'ts-duration';

export class RstMinerReport {
    constructor(
        public runtime: Duration,
        public totalNumberOfTraces: number,
        public numberOfTracesAfterNoiseFilter: number,
        public numberOfPartialOrders: number,
        public numPlacesTested: number
    ) {}

    public toFormattedString(): string {
        return (
            '' +
            '.type result\n' +
            'rST miner\n' +
            '.runtime\n' +
            this.runtime.milliseconds.toString() +
            ' ms\n' +
            '.output\n' +
            'total number of traces: ' +
            this.totalNumberOfTraces.toString() +
            '\n' +
            'number of traces after noise filtering: ' +
            this.numberOfTracesAfterNoiseFilter.toString() +
            '\n' +
            'number of partial orders: ' +
            this.numberOfPartialOrders.toString() +
            '\n' +
            'number of places tested: ' +
            this.numPlacesTested.toString() +
            '\n' +
            'average places tested per second: ' +
            (this.numPlacesTested / this.runtime.seconds).toFixed(1)
        );
    }
}
