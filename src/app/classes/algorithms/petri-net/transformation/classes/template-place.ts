import {Place} from "../../../../models/petri-net/place";
import {TemplateArc} from "./template-arc";

// Generated Place which is not yet connected with its arcs, so changing the component names is stil possible
export class TemplatePlace {

    private alreadyBuild = false;

    constructor(private readonly _marking: number, private readonly _unconnectedIngoingTemplateArcs: Array<TemplateArc> = [], private readonly _unconnectedOutgoingTemplateArcs: Array<TemplateArc> = []) {
    }

    public buildPlaceWithId(id: string): Place {
        if (this.alreadyBuild) {
            throw new Error("TemplatePlace was used already!") // TODO not needed?!
        }
        this.alreadyBuild = true;

        const place = new Place(this._marking, id);

        this._unconnectedIngoingTemplateArcs.forEach(unconnectedIngoingTemplateArc => {
            place.addIngoingArc(unconnectedIngoingTemplateArc.buildArcForPlace(place));
        })

        this._unconnectedOutgoingTemplateArcs.forEach(unconnectedOutgoingTemplateArc => {
            place.addOutgoingArc(unconnectedOutgoingTemplateArc.buildArcForPlace(place));
        })
        return place;
    }
}

