import { RstMinerReport } from './rst-miner-report';
import { PetriNet } from '../../models/petri-net/petri-net';
import { Duration } from 'ts-duration';

export class RstMinerResult {
    public rstMinerReport: RstMinerReport;

    constructor(
        public petriNet: PetriNet,
        runtime: Duration,
        totalNumberOfTraces: number,
        numTracesAfterNoiseFilter: number,
        numPartialOrders: number,
        numPlacesTested: number
    ) {
        this.rstMinerReport = new RstMinerReport(
            runtime,
            totalNumberOfTraces,
            numTracesAfterNoiseFilter,
            numPartialOrders,
            numPlacesTested
        );
    }
}
