import { Place } from '../../../../models/petri-net/place';
import { TemplateArc } from './template-arc';
import { ArcType, getTemplateArcs } from './arc-type';
import { Transition } from '../../../../models/petri-net/transition';

// Generated Place which is not yet connected with its arcs, so changing the component names is stil possible
export class TemplatePlace {
    constructor(
        readonly marking: number,
        readonly unconnectedIngoingTemplateArcs: Array<TemplateArc> = [],
        readonly unconnectedOutgoingTemplateArcs: Array<TemplateArc> = []
    ) {}

    public static of(place: Place): TemplatePlace {
        return new TemplatePlace(
            place.marking,
            place.ingoingArcs.map(arc => TemplateArc.of(arc)),
            place.outgoingArcs.map(arc => TemplateArc.of(arc))
        );
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

    public static toSameUniqueString(place: Place) {
        return (
            'p{' +
            place.marking +
            ',i:' +
            place.ingoingArcs
                .sort((e1, e2) =>
                    (e1.source as Transition).label!.localeCompare(
                        (e2.source as Transition).label!
                    )
                )
                .map(tArc => TemplateArc.toSameUniqueString(tArc))
                .concat(',') +
            ',o:' +
            place.outgoingArcs
                .sort((e1, e2) =>
                    (e1.destination as Transition).label!.localeCompare(
                        (e2.destination as Transition).label!
                    )
                )
                .map(tArc => TemplateArc.toSameUniqueString(tArc))
                .concat(',') +
            '}'
        );
    }

    public toUniqueString(): string {
        return (
            'p{' +
            this.marking +
            ',i:' +
            this.unconnectedIngoingTemplateArcs
                .sort((e1, e2) =>
                    e1.source!.label!.localeCompare(e2.source!.label!)
                )
                .map(tArc => tArc.toUniqueString())
                .concat(',') +
            ',o:' +
            this.unconnectedOutgoingTemplateArcs
                .sort((e1, e2) =>
                    e1.destination!.label!.localeCompare(e2.destination!.label!)
                )
                .map(tArc => tArc.toUniqueString())
                .concat(',') +
            '}'
        );
    }

    // equals is checking only the label of the transition not its recursive arcs etc.
    equalsRegardingMarkingAndSameArcTransitionLabels(
        other: TemplatePlace
    ): boolean {
        return (
            this.marking === other.marking &&
            this.isTransitionLabelsEquals(other, ArcType.INGOING) &&
            this.isTransitionLabelsEquals(other, ArcType.OUTGOING)
        );
    }

    private isTransitionLabelsEquals(other: TemplatePlace, arcType: ArcType) {
        function reduceArcsToMapTransitionLabelKeyArcValue(
            arcs: Array<TemplateArc>
        ) {
            return arcs.reduce(function (map, arc) {
                const transitionLabel =
                    arc.source instanceof Transition
                        ? arc.source.label!
                        : (arc.destination as Transition).label!;
                map.set(transitionLabel, arc);
                return map;
            }, new Map<string, TemplateArc>());
        }

        if (
            this.unconnectedIngoingTemplateArcs.length !==
                other.unconnectedIngoingTemplateArcs.length ||
            this.unconnectedOutgoingTemplateArcs.length !==
                other.unconnectedOutgoingTemplateArcs.length
        ) {
            return false;
        }

        const p1TransToArcs = reduceArcsToMapTransitionLabelKeyArcValue(
            getTemplateArcs(arcType, this)
        );
        const p2TransToArcs = reduceArcsToMapTransitionLabelKeyArcValue(
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
