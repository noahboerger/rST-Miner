import { Place } from '../../../../models/petri-net/place';
import { Arc } from '../../../../models/petri-net/arc';
import { Transition } from '../../../../models/petri-net/transition';

// Generated Place which is not yet connected with its arcs, so changing the component names is stil possible
export class TemplateArc {
    constructor(
        readonly source: Transition | undefined,
        readonly destination: Transition | undefined,
        readonly weight: number
    ) {
        if (
            (source == null && destination == null) ||
            (source != null && destination != null)
        ) {
            throw new Error('Only one of source or destination must be null!');
        }
    }

    public buildArcForPlace(place: Place): Arc {
        if (this.source != null) {
            const arcId = 'i' + place.id + this.source.label;
            return new Arc(arcId, this.source, place, this.weight);
        } else if (this.destination != null) {
            const arcId = 'o' + place.id + this.destination.label;
            return new Arc(arcId, place, this.destination, this.weight);
        }
        throw new Error('Only one of source or destination must be null!');
    }

    static toSameUniqueString(arc: Arc) {
        return (
            'a{' +
            arc.weight +
            ',' +
            (arc.source as Transition).label +
            ',' +
            (arc.destination as Transition).label +
            '}'
        );
    }

    toUniqueString() {
        return (
            'a{' +
            this.weight +
            ',' +
            this.source?.label +
            ',' +
            this.destination?.label +
            '}'
        );
    }
}
