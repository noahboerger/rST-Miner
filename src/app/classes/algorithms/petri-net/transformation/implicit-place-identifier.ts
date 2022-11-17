import {PetriNet} from "../../../models/petri-net/petri-net";
import {EventlogTrace} from "../../../models/eventlog/eventlog-trace";
import {Place} from "../../../models/petri-net/place";
import {Arc} from "../../../models/petri-net/arc";
import {Transition} from "../../../models/petri-net/transition";
import ArcType = ImplicitPlaceIdentifier.ArcType;


export class ImplicitPlaceIdentifier {


    constructor(private _transitions: Array<string>, private _uniqueTraces: Array<EventlogTrace>) {
    }


    public calculateImplicitPlacesFor(currentPlace: Place, petriNet: PetriNet) //: Array<Place> { TODO -> ggf Ersatzplatz einfügen
    {
        const relatedPlaces = this.calculateRelatedPlaces(currentPlace, petriNet);
        const implicitPlaces: Array<Place> = [];

        for (const relatedPlace of relatedPlaces) {
            switch (this.testRelation(currentPlace, relatedPlace)) {
                // Neuer Platz eine Subregion vom relatedPlace
                case -1:
                    if (validateCombinedPlace(relatedPlace, currentPlace)) {
                        implicitPlaces.push(relatedPlace)
                    }
                    break;
                // Keine Beziehung zwischen den Plätzen
                case 0:
                    break
                // Neuer Platz eine Superregion vom relatedPlace
                case 1:
                    if (validateCombinedPlace(currentPlace, relatedPlace) && !implicitPlaces.includes(currentPlace)) {
                        implicitPlaces.push(currentPlace)
                    }
                    break;
                default:
                    if (this.isTransitionsAndMarkingEquals(currentPlace, relatedPlace)) {
                        implicitPlaces.push(currentPlace);
                    } else {
                        throw new Error("Unexpected place relation occurred in ImplicitPlaceIdentifier!")
                    }
                    break;
            }
        }
        return implicitPlaces;
    }

    private calculateRelatedPlaces(place: Place, petriNet: PetriNet) {
        return petriNet.getPlaces()
            .filter(potentialPlace => potentialPlace !== place)
            .filter(potentialPlace => ImplicitPlaceIdentifier.hasCommonTransition(potentialPlace, place))
    }

    private static hasCommonTransition(p1: Place, p2: Place) { // TODO darf das so sein? (ggf Methode deaktivieren)
        const p1Sources = p1.ingoingArcs.map(arc => arc.source)
        for (const p2InArc of p2.ingoingArcs) {
            const p2Source = p2InArc.source;
            if (p1Sources.includes(p2Source)) {
                return true;
            }
        }
        return false;
    }

    private isTransitionsAndMarkingEquals(currentPlace: Place, relatedPlace: Place) {
        return currentPlace.marking === relatedPlace.marking &&
            this.isTransitionsEquals(currentPlace, relatedPlace, ArcType.INGOING) &&
            this.isTransitionsEquals(currentPlace, relatedPlace, ArcType.OUTGOING);
    }

    private isTransitionsEquals(p1: Place, p2: Place, arcType: ImplicitPlaceIdentifier.ArcType) {
        function reduceArcsToMapTransitionKeyArcValue(arcs: Array<Arc>) {
            return arcs.reduce(function (map, arc) {
                const transition = arc.source instanceof Transition ? arc.source : (arc.destination as Transition);
                map.set(transition, arc);
                return map;
            }, new Map<Transition, Arc>)
        }

        if (p1.ingoingArcs.length !== p2.ingoingArcs.length || p1.outgoingArcs.length !== p2.outgoingArcs.length) {
            return false;
        }

        const p1TransToArcs = reduceArcsToMapTransitionKeyArcValue(ArcType.getArcs(arcType, p1));
        const p2TransToArcs = reduceArcsToMapTransitionKeyArcValue(ArcType.getArcs(arcType, p1));

        for (let p1Trans of p1TransToArcs.keys()) {
            if (!p2TransToArcs.has(p1Trans)) {
                return false;
            }
            const p1Arc = p1TransToArcs.get(p1Trans)!
            const p2Arc = p2TransToArcs.get(p1Trans)!
            if (p1Arc.weight !== p2Arc.weight) {
                return false;
            }
        }

        return true;
    }

    private testRelation(place1: Place, place2: Place): number {

        let p1: FireablePlace;
        let p2: FireablePlace;
        let result = 2; // TODO nutzer lieber max / min
        let tempResult;

        for(let trace of this._uniqueTraces) {
            p1 = new FireablePlace(place1)
            p2 = new FireablePlace(place2)
            for(let event of trace.events) {
                const activity = event.activity;
                // TODO
            }
        }
        // TODO
    }


}

class FireablePlace {
    private _ingoingActivityToArcs: Map<string, Arc>;
    private _outgoingActivityToArcs: Map<string, Arc>

    public currentTokens: number;


    constructor(private place: Place) {
        function reduceArcsToMapActivityKeyArcValue(arcs: Array<Arc>) {
            return arcs.reduce(function (map, arc) {
                const transition = arc.source instanceof Transition ? arc.source : (arc.destination as Transition);
                map.set(transition.label!, arc);
                return map;
            }, new Map<string, Arc>)
        }

        this._ingoingActivityToArcs = reduceArcsToMapActivityKeyArcValue(place.ingoingArcs)
        this._outgoingActivityToArcs = reduceArcsToMapActivityKeyArcValue(place.ingoingArcs)
        this.currentTokens = place.marking;
    }

    public produceFire(activity: string) {
        if(this._ingoingActivityToArcs.has(activity)) {
            this.currentTokens += this._ingoingActivityToArcs.get(activity)!.weight;
        }
    }

    public consumeFire(activity: string) {
        if(this._outgoingActivityToArcs.has(activity)) {
            this.currentTokens -= this._outgoingActivityToArcs.get(activity)!.weight;
        }
    }
}


export namespace ImplicitPlaceIdentifier {
    export enum ArcType {
        INGOING, OUTGOING
    }

    export namespace ArcType {
        export function getArcs(arcType: ArcType, place: Place) {
            if (arcType === ArcType.INGOING) {
                return place.ingoingArcs;
            } else {
                return place.outgoingArcs;
            }
        }
    }
}
