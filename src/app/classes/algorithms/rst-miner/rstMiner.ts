import {PetriNet} from "../../models/petri-net/petri-net";
import {Place} from "../../models/petri-net/place";
import {Arc} from "../../models/petri-net/arc";
import {MinerSettings} from "../../models/miner-settings/miner-settings";
import {Eventlog} from "../../models/eventlog/eventlog";

export class RstMiner {

    public static MINING_ERROR = new Error(
        'given .type log string can not be parsed'
    );

    constructor(minerSettings: MinerSettings, eventlog: Eventlog) { // TODO assign params
    }


    public mine(): PetriNet {
        const petriNet =  new PetriNet();
        const p1 = new Place(undefined, undefined, undefined, "1");
        const p2 = new Place(undefined, undefined, undefined, "2");
        const arc = new Arc("test", p1, p2);
        petriNet.addPlace(p1);
        petriNet.addPlace(p2);
        petriNet.addArc(arc);
        return petriNet;
    }
}
