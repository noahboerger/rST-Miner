import {PetriNet} from "../../models/petri-net/petri-net";
import {Place} from "../../models/petri-net/place";
import {Arc} from "../../models/petri-net/arc";
import {MinerSettings} from "../../models/miner-settings/miner-settings";
import {Eventlog} from "../../models/eventlog/eventlog";
import {LogToPartialOrderTransformer} from "../concurrency-oracle/log-to-partial-order-transformer";
import {PetriNetIsomorphismTester} from "../petri-net/isomorphism/petri-net-isomorphism-tester";
import {
    PetriNetToPartialOrderTransformer
} from "../transformation/petri-net-to-partial-order-transformer";
import {PartialOrderIsomorphismTester} from "../partial-order/isomorphism/partial-order-isomorphism-tester";
import {ConcurrencyOracle} from "../concurrency-oracle/concurrency-oracle";

export class RstMiner {

    public static MINING_ERROR = new Error(
        'given .type log string can not be parsed'
    );

    private _concurrencyOracle: ConcurrencyOracle;
    private _logToPartialOrderTransformer: LogToPartialOrderTransformer = new LogToPartialOrderTransformer(new PetriNetIsomorphismTester(new PetriNetToPartialOrderTransformer(), new PartialOrderIsomorphismTester()));

    constructor(private _minerSettings: MinerSettings) {
        this._concurrencyOracle = _minerSettings.concurrencyOracle.generateConcurrencyOracle();
        // TODO assign params
    } // TODO Übergabe von MinerSettings in dieser Form nicht sinnvoll ->
    // Stattdessen übergeben von konkreten algorithmen, Halbordnungen etc.


    public mine(eventlog: Eventlog): PetriNet {

        const concurrencyRelation = this._concurrencyOracle.determineConcurrency(eventlog);
        const partialOrders = this._logToPartialOrderTransformer.transformToPartialOrders(eventlog, concurrencyRelation, {cleanLog: false}) // TODO --> Supports additional Config (Packen in Constructor?)

        // TODO --> Berechnung des flower-Models aus den PARTIAL ORDERS (potentielles Start / Stop Event vorhanden, etc.)

        const petriNet = new PetriNet();
        const p1 = new Place(undefined, undefined, undefined, "1");
        const p2 = new Place(undefined, undefined, undefined, "2");
        const arc = new Arc("test", p1, p2);
        petriNet.addPlace(p1);
        petriNet.addPlace(p2);
        petriNet.addArc(arc);
        return petriNet;
    }
}
