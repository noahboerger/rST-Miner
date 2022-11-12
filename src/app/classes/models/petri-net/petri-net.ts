import {Place} from './place';
import {Transition} from './transition';
import {Arc} from './arc';
import {Observable, Subject} from 'rxjs';
import {createUniqueString, IncrementingCounter} from '../../utility/incrementing-counter';
import {NetUnionResult} from './net-union-result';
import {getById} from '../../utility/get-by-id';
import {Marking} from './marking';

export class PetriNet {
    private _places: Map<string, Place>;
    private _transitions: Map<string, Transition>;
    private _arcs: Map<string, Arc>;
    private _frequency: number | undefined;
    private _inputPlaces: Set<string>;
    private _outputPlaces: Set<string>;

    private _kill$: Subject<void>;

    private _redraw$: Subject<void>;

    private _placeCounter = new IncrementingCounter();
    private _transitionCounter = new IncrementingCounter();
    private _arcCounter = new IncrementingCounter();

    constructor() {
        this._places = new Map<string, Place>();
        this._transitions = new Map<string, Transition>();
        this._arcs = new Map<string, Arc>();
        this._kill$ = new Subject<void>();
        this._redraw$ = new Subject<void>();
        this._inputPlaces = new Set<string>();
        this._outputPlaces = new Set<string>();
    }

    public static createFromArcSubset(net: PetriNet, arcs: Array<Arc>): PetriNet {
        const result = new PetriNet();
        net.getPlaces().forEach(p => {
            result.addPlace(new Place(p.marking, p.x, p.y, p.id));
        });
        net.getTransitions().forEach(t => {
            result.addTransition(new Transition(t.label, t.x, t.y, t.id));
        });
        arcs.forEach(a => {
            let source;
            let destination;
            if (a.source instanceof Place) {
                source = result.getPlace(a.sourceId) as Place;
                destination = result.getTransition(a.destinationId) as Transition;
            } else {
                source = result.getTransition(a.sourceId) as Transition;
                destination = result.getPlace(a.destinationId) as Place;
            }
            result.addArc(new Arc(a.getId(), source, destination, a.weight));
        });
        return result;
    }

    public static netUnion(a: PetriNet, b: PetriNet): NetUnionResult {
        const result = a.clone();

        const counter = new IncrementingCounter();
        const placeMap = new Map<string, string>();
        const transitionMap = new Map<string, string>();

        b.getPlaces().forEach(p => {
            let mappedId = p.getId();
            while (result.getPlace(mappedId) !== undefined) {
                mappedId = p.getId() + counter.next();
            }
            placeMap.set(p.getId(), mappedId);
            result.addPlace(new Place(p.marking, p.x, p.y, mappedId));
        });

        b.getTransitions().forEach(t => {
            let mappedId = t.getId();
            while (result.getTransition(mappedId) !== undefined) {
                mappedId = t.getId() + counter.next();
            }
            transitionMap.set(t.getId(), mappedId);
            result.addTransition(new Transition(t.label, t.x, t.y, mappedId));
        });

        b.getArcs().forEach(arc => {
            let arcId = arc.getId();
            while (result.getArc(arcId) !== undefined) {
                arcId = arc.getId() + counter.next();
            }
            if (arc.source instanceof Place) {
                result.addArc(new Arc(arcId, result.getPlace(placeMap.get(arc.sourceId) as string) as Place, result.getTransition(transitionMap.get(arc.destinationId) as string) as Transition, arc.weight));
            } else {
                result.addArc(new Arc(arcId, result.getTransition(transitionMap.get(arc.sourceId) as string) as Transition, result.getPlace(placeMap.get(arc.destinationId) as string) as Place, arc.weight));
            }
        });

        const inputPlacesB = new Set<string>(result._inputPlaces);
        const outputPlacesB = new Set<string>(result._outputPlaces);

        a.inputPlaces.forEach(p => {
            inputPlacesB.delete(p);
        })
        a.outputPlaces.forEach(p => {
            outputPlacesB.delete(p)
        })

        return {net: result, inputPlacesB, outputPlacesB};
    }

    public static fireTransitionInMarking(net: PetriNet, transitionId: string, marking: Marking): Marking {
        const transition = net.getTransition(transitionId);
        if (transition === undefined) {
            throw new Error(`The given net does not contain a transition with id '${transitionId}'`);
        }

        const newMarking: Marking = new Marking(marking);

        for (const inArc of transition.ingoingArcs) {
            const m = marking.get(inArc.sourceId);
            if (m === undefined) {
                throw new Error(`The transition with id '${transitionId}' has an incoming arc from a place with id '${inArc.sourceId}' but no such place is defined in the provided marking!`);
            }
            if (m - inArc.weight < 0) {
                throw new Error(`The transition with id '${transitionId}' is not enabled in the provided marking! The place with id '${inArc.sourceId}' contains ${m} tokens, but the arc weight is ${inArc.weight}.`);
            }
            newMarking.set(inArc.sourceId, m - inArc.weight);
        }

        for (const outArc of transition.outgoingArcs) {
            const m = marking.get(outArc.destinationId);
            if (m === undefined) {
                throw new Error(`The transition with id '${transitionId}' has an outgoing arc to a place with id '${outArc.destinationId}' but no such place is defined in the provided marking!`);
            }
            newMarking.set(outArc.destinationId, m + outArc.weight);
        }

        return newMarking;
    }

    public static getAllEnabledTransitions(net: PetriNet, marking: Marking): Array<Transition> {
        return net.getTransitions().filter(t => PetriNet.isTransitionEnabledInMarking(net, t.id!, marking));
    }

    public static isTransitionEnabledInMarking(net: PetriNet, transitionId: string, marking: Marking): boolean {
        const transition = net.getTransition(transitionId);
        if (transition === undefined) {
            throw new Error(`The given net does not contain a transition with id '${transitionId}'`);
        }

        for (const inArc of transition.ingoingArcs) {
            const m = marking.get(inArc.sourceId);
            if (m === undefined) {
                throw new Error(`The transition with id '${transitionId}' has an incoming arc from a place with id '${inArc.sourceId}' but no such place is defined in the provided marking!`);
            }
            if (m - inArc.weight < 0) {
                return false;
            }
        }
        return true;
    }

    private static determineInOut(p: Place, input: Set<string>, output: Set<string>) {
        if (p.ingoingArcs.length === 0) {
            input.add(p.getId());
        }
        if (p.outgoingArcs.length === 0) {
            output.add(p.getId());
        }
    }

    public getTransition(id: string): Transition | undefined {
        return this._transitions.get(id);
    }

    public getTransitions(): Array<Transition> {
        return Array.from(this._transitions.values());
    }

    public getTransitionCount(): number {
        return this._transitions.size;
    }

    public addTransition(transition: Transition) {
        if (transition.id === undefined) {
            transition.id = createUniqueString('t', this._transitions, this._transitionCounter);
        }
        this._transitions.set(transition.id, transition);
    }

    public removeTransition(transition: Transition | string) {
        const t = getById(this._transitions, transition);
        if (t === undefined) {
            return;
        }
        transition = t;

        this._transitions.delete(transition.getId());
        transition.outgoingArcs.forEach(a => {
            this.removeArc(a);
        });
        transition.ingoingArcs.forEach(a => {
            this.removeArc(a);
        });
    }

    public getPlace(id: string): Place | undefined {
        return this._places.get(id);
    }

    public getPlaces(): Array<Place> {
        return Array.from(this._places.values());
    }

    public getPlaceCount(): number {
        return this._places.size;
    }

    public addPlace(place: Place) {
        if (place.id === undefined) {
            place.id = createUniqueString('p', this._places, this._placeCounter);
        }
        this._places.set(place.id, place);
        this._inputPlaces.add(place.id);
        this._outputPlaces.add(place.id);
    }

    public removePlace(place: Place | string) {
        const p = getById(this._places, place);
        if (p === undefined) {
            return;
        }
        place = p;

        this._places.delete(place.getId());
        place.outgoingArcs.forEach(a => {
            this.removeArc(a);
        });
        place.ingoingArcs.forEach(a => {
            this.removeArc(a);
        });

        this._inputPlaces.delete(place.getId());
        this._outputPlaces.delete(place.getId());
    }

    public getArc(id: string): Arc | undefined {
        return this._arcs.get(id);
    }

    public getArcs(): Array<Arc> {
        return Array.from(this._arcs.values());
    }

    public getArcCount(): number {
        return this._arcs.size;
    }

    public addArc(arc: Arc): void;
    public addArc(source: Transition, destination: Place, weight?: number): void;
    public addArc(source: Place, destination: Transition, weight?: number): void;
    public addArc(arcOrSource: Arc | Transition | Place, destination?: Place | Transition, weight: number = 1) {
        if (arcOrSource instanceof Arc) {
            this._arcs.set(arcOrSource.getId(), arcOrSource);
            if (arcOrSource.source instanceof Place) {
                this._outputPlaces.delete(arcOrSource.sourceId);
            } else if (arcOrSource.destination instanceof Place) {
                this._inputPlaces.delete(arcOrSource.destinationId);
            }
        } else {
            this.addArc(new Arc(createUniqueString('a', this._arcs, this._arcCounter), arcOrSource, destination!, weight));
        }
    }

    public removeArc(arc: Arc | string) {
        const a = getById(this._arcs, arc);
        if (a === undefined) {
            return;
        }
        arc = a;

        this._arcs.delete(arc.getId());
        arc.source.removeArc(arc);
        arc.destination.removeArc(arc);
        if (arc.source instanceof Place && arc.source.outgoingArcs.length === 0) {
            this._outputPlaces.add(arc.sourceId);
        } else if (arc.destination instanceof Place && arc.destination.ingoingArcs.length === 0) {
            this._inputPlaces.add(arc.destinationId);
        }
    }

    get frequency(): number | undefined {
        return this._frequency;
    }

    set frequency(value: number | undefined) {
        this._frequency = value;
    }

    get inputPlaces(): Set<string> {
        return this._inputPlaces;
    }

    get outputPlaces(): Set<string> {
        return this._outputPlaces;
    }

    public getInitialMarking(): Marking {
        const m = new Marking({});

        this.getPlaces().forEach(p => {
            m.set(p.id!, p.marking);
        });

        return m;
    }

    public isEmpty(): boolean {
        return this._places.size === 0 && this._transitions.size === 0;
    }

    public clone(): PetriNet {
        return PetriNet.createFromArcSubset(this, this.getArcs());
    }

    public destroy() {
        if (!this._kill$.closed) {
            this._kill$.next();
            this._kill$.complete();
        }
        this._redraw$.complete();
    }

    public bindEvents(mouseMoved$: Subject<MouseEvent>, mouseUp$: Subject<MouseEvent>) {
        this._places.forEach((v, k) => v.bindEvents(mouseMoved$, mouseUp$, this._kill$.asObservable(), this._redraw$));
        this._transitions.forEach((v, k) => v.bindEvents(mouseMoved$, mouseUp$, this._kill$.asObservable(), this._redraw$));
        this._arcs.forEach((v, k) => v.bindEvents(mouseMoved$, mouseUp$, this._kill$.asObservable(), this._redraw$));
    }

    public redrawRequest$(): Observable<void> {
        return this._redraw$.asObservable();
    }
}
