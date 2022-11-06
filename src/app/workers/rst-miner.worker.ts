/// <reference lib="webworker" />
import {TypedJSON} from 'typedjson';
import {Eventlog} from '../classes/models/eventlog/eventlog';
import {MinerSettings} from "../classes/models/miner-settings/miner-settings";
import {RstMiner} from "../classes/algorithms/rst-miner/rstMiner";
import {serialisePetriNet} from "../classes/serde/petri-net-serialisation";

onmessage = function (data) {
    const minerSettings = new TypedJSON(MinerSettings).parse(data.data[0]); // TODO ggf utility fkt nutzen
    const eventlog = new TypedJSON(Eventlog).parse(data.data[1])


    if (minerSettings == null || eventlog == null) {
        // TODO
        return;
    }

    const resultingPetriNet = new RstMiner(minerSettings, eventlog).mine();
    postMessage(serialisePetriNet(resultingPetriNet));
};
