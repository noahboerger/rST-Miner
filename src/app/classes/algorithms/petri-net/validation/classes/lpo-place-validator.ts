import { ValidationResult } from './validation-result';
import { PartialOrderEvent } from '../../../../models/partial-order/partial-order-event';
import { PartialOrder } from '../../../../models/partial-order/partial-order';
import { PetriNet } from '../../../../models/petri-net/petri-net';

export abstract class LpoPlaceValidator {
    protected readonly _lpo: PartialOrder;

    protected constructor(lpo: PartialOrder) {
        this._lpo = lpo.clone();
        this.modifyLPO();
    }

    private readonly initialMarking = 'initial marking';
    private readonly finalMarking = 'final marking';

    protected modifyLPO() {
        const initial = new PartialOrderEvent(this.initialMarking, undefined);
        const final = new PartialOrderEvent(this.finalMarking, undefined);
        for (const e of this._lpo.initialEvents) {
            initial.addNextEvent(e);
        }
        for (const e of this._lpo.finalEvents) {
            e.addNextEvent(final);
        }
        this._lpo.addEvent(initial);
        this._lpo.addEvent(final);
    }

    protected postUpdateModifiedLPO(toBeCheckedNet: PetriNet) {
        // cleanup for reuse and label splitting check
        this._lpo.events.forEach(e => (e.transition = undefined));

        for (const e of this._lpo.events) {
            if (e.id === this.initialMarking || e.id === this.finalMarking) {
                continue;
            }
            for (const t of toBeCheckedNet.getTransitions()) {
                if (e.label === t.label) {
                    if (e.transition !== undefined) {
                        throw new Error(
                            `The algorithm does not support label-splitted nets`
                        );
                    }
                    e.transition = t;
                }
            }
            if (e.transition === undefined) {
                throw new Error(
                    `The net does not contain a transition with the label '${e.label}' of the event '${e.id}'`
                );
            }
        }
    }

    public abstract validate(
        toBeCheckedNet: PetriNet,
        toBeValidatedPlaceId: string
    ): ValidationResult;

    public get lpoFrequency(): number | undefined {
        return this._lpo.frequency;
    }
}
