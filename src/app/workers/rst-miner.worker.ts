/// <reference lib="webworker" />
import {TypedJSON} from 'typedjson';
import {Eventlog} from '../classes/models/eventlog/eventlog';
import {RstMinerSettings} from "../classes/models/miner-settings/rst-miner-settings";
import {RstMiner} from "../classes/algorithms/rst-miner/rst-miner";
import {serialisePetriNet} from "../classes/serde/petri-net-serialisation";

onmessage = function (data) {
    const minerSettings = new TypedJSON(RstMinerSettings).parse(data.data[0]); // TODO ggf utility fkt nutzen
    const eventlog = new TypedJSON(Eventlog).parse(data.data[1])


    if (minerSettings == null || eventlog == null) {
        // TODO
        return;
    }

    const resultingPetriNet = new RstMiner(minerSettings).mine(eventlog);
    postMessage(serialisePetriNet(resultingPetriNet));
};
