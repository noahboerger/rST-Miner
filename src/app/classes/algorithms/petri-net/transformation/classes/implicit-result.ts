import {Place} from "../../../../models/petri-net/place";
import {Arc} from "../../../../models/petri-net/arc";
import {Transition} from "../../../../models/petri-net/transition";
import {TemplatePlace} from "./template-place";

export class ImplicitResult {

    constructor(public implicitPlace : Place, public substitutePlace : TemplatePlace | undefined = undefined) {
    }


}

