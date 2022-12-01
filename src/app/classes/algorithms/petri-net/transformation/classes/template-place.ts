import {Place} from '../../../../models/petri-net/place';
import {TemplateArc} from './template-arc';
import {ArcType, getArcs, getTemplateArcs} from "./arc-type";
import {Arc} from "../../../../models/petri-net/arc";
import {Transition} from "../../../../models/petri-net/transition";

// Generated Place which is not yet connected with its arcs, so changing the component names is stil possible
export class TemplatePlace {

    constructor(
        readonly marking: number,
        readonly unconnectedIngoingTemplateArcs: Array<TemplateArc> = [],
        readonly unconnectedOutgoingTemplateArcs: Array<TemplateArc> = []
    ) {
    }

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

    equals(other: TemplatePlace): boolean {
        return this.marking === other.marking &&
            this.isTransitionsEquals(
                other,
                ArcType.INGOING
            ) &&
            this.isTransitionsEquals(
                other,
                ArcType.OUTGOING
            )
    }


    private isTransitionsEquals(other: TemplatePlace, arcType: ArcType) {
        function reduceArcsToMapTransitionKeyArcValue(arcs: Array<TemplateArc>) {
            return arcs.reduce(function (map, arc) {
                const transition =
                    arc.source instanceof Transition
                        ? arc.source
                        : (arc.destination as Transition);
                map.set(transition, arc);
                return map;
            }, new Map<Transition, TemplateArc>());
        }

        if (
            this.unconnectedIngoingTemplateArcs.length !== other.unconnectedIngoingTemplateArcs.length ||
            this.unconnectedOutgoingTemplateArcs.length !== other.unconnectedOutgoingTemplateArcs.length
        ) {
            return false;
        }

        const p1TransToArcs = reduceArcsToMapTransitionKeyArcValue(
            getTemplateArcs(arcType, this)
        );
        const p2TransToArcs = reduceArcsToMapTransitionKeyArcValue(
            getTemplateArcs(arcType, other)
        );

        for (let p1Trans of p1TransToArcs.keys()) {
            if (!p2TransToArcs.has(p1Trans)) {
                return false;
            }
            const p1Arc = p1TransToArcs.get(p1Trans)!;
            const p2Arc = p2TransToArcs.get(p1Trans)!;
            if (p1Arc.weight !== p2Arc.weight) {
                return false;
            }
        }

        return true;
    }
}
