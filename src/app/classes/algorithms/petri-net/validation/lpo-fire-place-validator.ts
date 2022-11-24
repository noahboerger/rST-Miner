import { ValidationPhase, ValidationResult } from './classes/validation-result';
import { LpoFlowPlaceValidator } from './lpo-flow-place-validator';
import { Transition } from '../../../models/petri-net/transition';
import { Arc } from '../../../models/petri-net/arc';
import { Place } from '../../../models/petri-net/place';
import { PartialOrderEvent } from '../../../models/partial-order/partial-order-event';
import { PetriNet } from '../../../models/petri-net/petri-net';
import { PartialOrder } from '../../../models/partial-order/partial-order';

export class LpoFirePlaceValidator extends LpoFlowPlaceValidator {
    private readonly _totalOrder: Array<PartialOrderEvent>;

    constructor(lpo: PartialOrder) {
        super(lpo);
        this._totalOrder = this.buildTotalOrdering();
    }

    protected override modifyLPO() {
        super.modifyLPO();
        this._lpo.determineInitialAndFinalEvents();
    }

    override validate(
        toBeCheckedNet: PetriNet,
        toBeValidatedPlaceId: string
    ): ValidationResult {
        this.postUpdateModifiedLPO(toBeCheckedNet);
        const places = toBeCheckedNet.getPlaces();

        this._totalOrder.forEach(e => e.initializeLocalMarking(places.length));

        const toBeValidatedPlaceIndex = places.findIndex(
            value => value.id === toBeValidatedPlaceId
        );

        // build start event
        const initialEvent = this._totalOrder[0];
        for (let i = 0; i < places.length; i++) {
            initialEvent.localMarking![i] = places[i].marking;
        }

        const validPlaces = this.newBoolArray(places, true);
        const complexPlaces = this.newBoolArray(places, false);

        let queue = [...this._totalOrder];
        this.fireForwards(places, queue, validPlaces, complexPlaces);

        // valid place
        if (validPlaces[toBeValidatedPlaceIndex]) {
            return new ValidationResult(true, ValidationPhase.FORWARDS);
        }

        // not valid place
        const finalEvent = [...this._lpo.finalEvents][0];
        if (finalEvent.localMarking![toBeValidatedPlaceIndex] < 0) {
            return new ValidationResult(false, ValidationPhase.FORWARDS);
        }

        // Don't fire all backwards!
        queue = [finalEvent];
        for (let i = this._totalOrder.length - 2; i >= 0; i--) {
            this._totalOrder[i].initializeLocalMarking(places.length);
            queue.push(this._totalOrder[i]);
        }

        const backwardsValidPlaces = this.newBoolArray(places, true);
        const backwardsComplexPlaces = this.newBoolArray(places, false);

        // Is the final marking > 0 ?
        for (let i = 0; i < places.length; i++) {
            if (finalEvent.localMarking![i] < 0) {
                backwardsValidPlaces[i] = false;
            }
        }

        this.fireBackwards(
            places,
            queue,
            backwardsValidPlaces,
            backwardsComplexPlaces
        );

        // Backwards valid place
        if (backwardsValidPlaces[toBeValidatedPlaceIndex]) {
            return new ValidationResult(true, ValidationPhase.BACKWARDS);
        }

        // backwards not valid place
        const finalBackwardsEvent = [...this._lpo.initialEvents][0];
        if (finalBackwardsEvent.localMarking![toBeValidatedPlaceIndex] < 0) {
            return new ValidationResult(false, ValidationPhase.FORWARDS);
        }

        // otherwise with flow
        return new ValidationResult(
            this.checkFlowForPlace(
                places[toBeValidatedPlaceIndex],
                this._lpo.events
            ),
            ValidationPhase.FLOW
        );
    }

    private buildTotalOrdering(): Array<PartialOrderEvent> {
        const ordering: Array<PartialOrderEvent> = [...this._lpo.initialEvents];
        const contained: Set<PartialOrderEvent> = new Set<PartialOrderEvent>(
            this._lpo.initialEvents
        );

        const examineLater: Array<PartialOrderEvent> = [...this._lpo.events];
        while (examineLater.length > 0) {
            const e = examineLater.shift() as PartialOrderEvent;
            if (contained.has(e)) {
                continue;
            }

            let add = true;
            for (const pre of e.previousEvents) {
                if (!contained.has(pre)) {
                    add = false;
                    break;
                }
            }
            if (add) {
                ordering.push(e);
                contained.add(e);
            } else {
                examineLater.push(e);
            }
        }

        return ordering;
    }

    private fireForwards(
        places: Array<Place>,
        queue: Array<PartialOrderEvent>,
        validPlaces: Array<boolean>,
        complexPlaces: Array<boolean>
    ) {
        this.fire(
            places,
            queue,
            validPlaces,
            complexPlaces,
            t => t.ingoingArcs,
            a => a.source as Place,
            t => t.outgoingArcs,
            a => a.destination as Place,
            e => e.nextEvents
        );
    }

    private fireBackwards(
        places: Array<Place>,
        queue: Array<PartialOrderEvent>,
        validPlaces: Array<boolean>,
        complexPlaces: Array<boolean>
    ) {
        this.fire(
            places,
            queue,
            validPlaces,
            complexPlaces,
            t => t.outgoingArcs,
            a => a.destination as Place,
            t => t.ingoingArcs,
            a => a.source as Place,
            e => e.previousEvents
        );
    }

    private fire(
        places: Array<Place>,
        firingOrder: Array<PartialOrderEvent>,
        validPlaces: Array<boolean>,
        complexPlaces: Array<boolean>,
        preArcs: (t: Transition) => Array<Arc>,
        prePlace: (a: Arc) => Place,
        postArcs: (t: Transition) => Array<Arc>,
        postPlace: (a: Arc) => Place,
        nextEvents: (e: PartialOrderEvent) => Set<PartialOrderEvent>
    ) {
        while (firingOrder.length > 0) {
            const e = firingOrder.shift() as PartialOrderEvent;

            // can fire?
            if (e.transition !== undefined) {
                // fire
                for (const arc of preArcs(e.transition)) {
                    const pIndex = this.getPIndex(places, prePlace(arc));
                    e.localMarking![pIndex] =
                        e.localMarking![pIndex] - arc.weight;
                    if (e.localMarking![pIndex] < 0) {
                        validPlaces[pIndex] = false;
                    }
                }

                for (const arc of postArcs(e.transition)) {
                    const pIndex = this.getPIndex(places, postPlace(arc));
                    e.localMarking![pIndex] =
                        e.localMarking![pIndex] + arc.weight;
                }
            }

            // push to first later and check for complex places
            if (nextEvents(e).size > 0) {
                for (let i = 0; i < places.length; i++) {
                    if (nextEvents(e).size > 1 && e.localMarking![i] > 0) {
                        complexPlaces[i] = true;
                    }
                    const firstLater = [...nextEvents(e)][0];
                    firstLater.localMarking![i] =
                        firstLater.localMarking![i] + e.localMarking![i];
                }
            }
        }
    }

    private getPIndex(places: Array<Place>, p: Place) {
        return places.findIndex(pp => pp === p);
    }

    private newBoolArray(places: Array<Place>, fill: boolean): Array<boolean> {
        return new Array<boolean>(places.length).fill(fill);
    }
}
