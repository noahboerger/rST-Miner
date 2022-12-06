import { PartialOrderEvent } from './partial-order-event';

export class PartialOrder {
    private readonly _events: Map<string, PartialOrderEvent>;
    private readonly _initialEvents: Set<PartialOrderEvent>;
    private readonly _finalEvents: Set<PartialOrderEvent>;

    constructor(public frequency: number | undefined = 0) {
        this._events = new Map<string, PartialOrderEvent>();
        this._initialEvents = new Set<PartialOrderEvent>();
        this._finalEvents = new Set<PartialOrderEvent>();
    }

    get initialEvents(): Set<PartialOrderEvent> {
        return this._initialEvents;
    }

    get finalEvents(): Set<PartialOrderEvent> {
        return this._finalEvents;
    }

    get events(): Array<PartialOrderEvent> {
        return Array.from(this._events.values());
    }

    public getEvent(id: string): PartialOrderEvent | undefined {
        return this._events.get(id);
    }

    public addEvent(event: PartialOrderEvent): void {
        if (this._events.has(event.id)) {
            throw new Error(
                `An event with id '${event.id}' already exists in this partial order!`
            );
        }
        this._events.set(event.id, event);
    }

    public determineInitialAndFinalEvents() {
        this._initialEvents.clear();
        this._finalEvents.clear();
        for (const e of this._events.values()) {
            if (e.previousEvents.size === 0) {
                this._initialEvents.add(e);
            }
            if (e.nextEvents.size === 0) {
                this._finalEvents.add(e);
            }
        }
    }

    public clone(): PartialOrder {
        const result = new PartialOrder(this.frequency);
        for (const e of this._events.values()) {
            result.addEvent(new PartialOrderEvent(e.id, e.label));
        }
        for (const e of this._events.values()) {
            const cloneE = result.getEvent(e.id) as PartialOrderEvent;
            for (const nextE of e.nextEvents) {
                cloneE.addNextEvent(
                    result.getEvent(nextE.id) as PartialOrderEvent
                );
            }
        }
        result.determineInitialAndFinalEvents();
        return result;
    }
}
