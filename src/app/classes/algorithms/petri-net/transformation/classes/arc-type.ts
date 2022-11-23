import { Place } from '../../../../models/petri-net/place';
import { Arc } from '../../../../models/petri-net/arc';
import { Transition } from '../../../../models/petri-net/transition';

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
