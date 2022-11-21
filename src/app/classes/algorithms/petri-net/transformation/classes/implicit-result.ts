import {Place} from "../../../../models/petri-net/place";
import {Arc} from "../../../../models/petri-net/arc";
import {Transition} from "../../../../models/petri-net/transition";

export class ImplicitResult {

    constructor(public implicitPlace : Place, public substitutePlace : Place | undefined = undefined) {
    }


}

