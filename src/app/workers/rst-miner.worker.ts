/// <reference lib="webworker" />
import { TypedJSON } from 'typedjson';
import { Eventlog } from '../classes/models/eventlog/eventlog';
import { RstMinerSettings } from '../classes/models/miner-settings/rst-miner-settings';
import { RstMiner } from '../classes/algorithms/rst-miner/rst-miner';
import { serialisePetriNet } from '../classes/serde/petri-net-serialisation';
import { SerializableStringPair } from '../classes/models/utils/serializable-string-pair';

onmessage = function (data) {
    const minerSettings = new TypedJSON(RstMinerSettings).parse(data.data[0]);
    const eventlog = new TypedJSON(Eventlog).parse(data.data[1]);

    if (minerSettings == null || eventlog == null) {
        throw RstMiner.MINING_ERROR;
    }

    const rstMiner = new RstMiner(minerSettings);
    const rstMinerResult = rstMiner.mine(eventlog);

    const petriNetString = serialisePetriNet(rstMinerResult.petriNet);
    const reportString = rstMinerResult.rstMinerReport.toFormattedString();

    const serialisedResultPair = new TypedJSON(
        SerializableStringPair
    ).stringify(new SerializableStringPair(petriNetString, reportString));

    postMessage(serialisedResultPair);
};
