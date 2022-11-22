import { PetriNet } from '../../models/petri-net/petri-net';
import { PartialOrder } from '../../models/partial-order/partial-order';
import { PartialOrderEvent } from '../../models/partial-order/partial-order-event';

export class PetriNetToPartialOrderTransformer {
    public transform(net: PetriNet): PartialOrder {
        const badPlace = net
            .getPlaces()
            .find(
                p =>
                    p.ingoingArcs.length > 1 ||
                    p.outgoingArcs.length > 1 ||
                    (p.ingoingArcs.length === 1 &&
                        p.outgoingArcs.length === 1 &&
                        p.ingoingArcs[0].sourceId ===
                            p.outgoingArcs[0].destinationId)
            );
        if (badPlace !== undefined) {
            throw new Error(
                `The given Petri net is not a partial order! The place with id '${badPlace.id}' has too many in-/outgoing arcs or is part of a self-loop.`
            );
        }
        const badTransition = net
            .getTransitions()
            .find(
                t =>
                    t.ingoingArcs.length === 0 ||
                    t.outgoingArcs.length === 0 ||
                    t.label === undefined
            );
        if (badTransition !== undefined) {
            throw new Error(
                `The given Petri net is not a partial order! The transition with id '${badTransition.id}' has an empty pre-/post-set or is unlabeled`
            );
        }

        const result = new PartialOrder();
        for (const t of net.getTransitions()) {
            result.addEvent(new PartialOrderEvent(t.id!, t.label));
        }
        for (const t of net.getTransitions()) {
            const event = result.getEvent(t.id!)!;
            for (const arc of t.outgoingArcs) {
                const nextTransitionId =
                    arc.destination.outgoingArcs[0]?.destinationId;
                if (nextTransitionId !== undefined) {
                    event.addNextEvent(result.getEvent(nextTransitionId)!);
                }
            }
        }

        return result;
    }
}
