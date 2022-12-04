import { Place } from '../../../../models/petri-net/place';
import { Arc } from '../../../../models/petri-net/arc';
import { Transition } from '../../../../models/petri-net/transition';
import { TemplatePlace } from './template-place';

export enum ArcType {
    INGOING,
    OUTGOING,
}

export function getArcs(arcType: ArcType, place: Place) {
    if (arcType === ArcType.INGOING) {
        return place.ingoingArcs;
    } else {
        return place.outgoingArcs;
    }
}

export function getTemplateArcs(
    arcType: ArcType,
    templatePlace: TemplatePlace
) {
    if (arcType === ArcType.INGOING) {
        return templatePlace.unconnectedIngoingTemplateArcs;
    } else {
        return templatePlace.unconnectedOutgoingTemplateArcs;
    }
}

export function reduceArcsToMapActivityKeyArcValue(arcs: Array<Arc>) {
    return arcs.reduce(function (map, arc) {
        const transition =
            arc.source instanceof Transition
                ? arc.source
                : (arc.destination as Transition);
        map.set(transition.label!, arc);
        return map;
    }, new Map<string, Arc>());
}
