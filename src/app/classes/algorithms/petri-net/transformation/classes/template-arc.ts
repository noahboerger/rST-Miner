import {Place} from "../../../../models/petri-net/place";
import {Arc} from "../../../../models/petri-net/arc";
import {Transition} from "../../../../models/petri-net/transition";
import {Node} from "../../../../models/petri-net/node";
import {A} from "@angular/cdk/keycodes";

// Generated Place which is not yet connected with its arcs, so changing the component names is stil possible
export class TemplateArc {

    private alreadyBuild = false;


    constructor(readonly _source: Transition | undefined, readonly _destination: Transition | undefined, private readonly _weight: number) {
        if(_source == null && _destination == null || _source != null && _destination != null) {
            throw new Error("Only one of source or destination must be null!")
        }
    }

    public buildArcForPlace(place: Place): Arc {
        if (this.alreadyBuild) {
            throw new Error("TemplateArc was used already!") // TODO not needed
        }
        this.alreadyBuild = true;

        if(this._source != null) {
            const arcId = "i" + place.id + this._source.label;
            return new Arc(arcId, this._source, place, this._weight);

        } else if(this._destination != null) {
            const arcId = "o" + place.id + this._destination.label;
            return new Arc(arcId, place, this._destination, this._weight);
        }
        throw new Error("Only one of source or destination must be null!")
    }
}

