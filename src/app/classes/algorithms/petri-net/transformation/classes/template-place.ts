import { Place } from '../../../../models/petri-net/place';
import { TemplateArc } from './template-arc';

// Generated Place which is not yet connected with its arcs, so changing the component names is stil possible
export class TemplatePlace {
    constructor(
        readonly _marking: number,
        readonly _unconnectedIngoingTemplateArcs: Array<TemplateArc> = [],
        readonly _unconnectedOutgoingTemplateArcs: Array<TemplateArc> = []
    ) {}

    public buildPlaceWithId(id: string): Place {
        const place = new Place(this._marking, id);

        this._unconnectedIngoingTemplateArcs.forEach(
            unconnectedIngoingTemplateArc => {
                place.addIngoingArc(
                    unconnectedIngoingTemplateArc.buildArcForPlace(place)
                );
            }
        );

        this._unconnectedOutgoingTemplateArcs.forEach(
            unconnectedOutgoingTemplateArc => {
                place.addOutgoingArc(
                    unconnectedOutgoingTemplateArc.buildArcForPlace(place)
                );
            }
        );
        return place;
    }
}
