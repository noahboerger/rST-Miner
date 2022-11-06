import {Transition} from '../petri-net/transition';

export class PartialOrderEvent {
    private readonly _id: string;
    private readonly _label: string | undefined;
    private readonly _nextEvents: Set<PartialOrderEvent>;
    private readonly _previousEvents: Set<PartialOrderEvent>;

    private _transition: undefined | Transition;
    private _localMarking: undefined | Array<number>;

    constructor(id: string, label?: string) {
        this._id = id;
        this._label = label;
        this._nextEvents = new Set<PartialOrderEvent>();
        this._previousEvents = new Set<PartialOrderEvent>();
    }

    get id(): string {
        return this._id;
    }

    get label(): string | undefined {
        return this._label;
    }

    get nextEvents(): Set<PartialOrderEvent> {
        return this._nextEvents;
    }

    get previousEvents(): Set<PartialOrderEvent> {
        return this._previousEvents;
    }

    get transition(): Transition | undefined {
        return this._transition;
    }

    set transition(value: Transition | undefined) {
        this._transition = value;
    }

    get localMarking(): Array<number> | undefined {
        return this._localMarking;
    }

    public addNextEvent(event: PartialOrderEvent) {
        this._nextEvents.add(event);
        event.addPreviousEvent(this);
    }

    protected addPreviousEvent(event: PartialOrderEvent) {
        this._previousEvents.add(event);
    }

    public initializeLocalMarking(size: number) {
        this._localMarking = new Array<number>(size).fill(0);
    }
}
