import { Place } from '../../../../models/petri-net/place';
import { TemplateArc } from './template-arc';

// Generated Place which is not yet connected with its arcs, so changing the component names is stil possible
export class TemplatePlace {
    constructor(
        readonly marking: number,
        readonly unconnectedIngoingTemplateArcs: Array<TemplateArc> = [],
        readonly unconnectedOutgoingTemplateArcs: Array<TemplateArc> = []
    ) {}

    public buildPlaceWithId(id: string): Place {
        const place = new Place(this.marking, id);

        this.unconnectedIngoingTemplateArcs.forEach(
            unconnectedIngoingTemplateArc => {
                place.addIngoingArc(
                    unconnectedIngoingTemplateArc.buildArcForPlace(place)
                );
            }
        );

        this.unconnectedOutgoingTemplateArcs.forEach(
            unconnectedOutgoingTemplateArc => {
                place.addOutgoingArc(
                    unconnectedOutgoingTemplateArc.buildArcForPlace(place)
                );
            }
        );
        return place;
    }
}
