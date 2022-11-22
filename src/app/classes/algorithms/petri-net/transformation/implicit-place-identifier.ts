import {PetriNet} from "../../../models/petri-net/petri-net";
import {EventlogTrace} from "../../../models/eventlog/eventlog-trace";
import {Place} from "../../../models/petri-net/place";
import {Arc} from "../../../models/petri-net/arc";
import {Transition} from "../../../models/petri-net/transition";
import {ArcType, getArcs, reduceArcsToMapActivityKeyArcValue} from "./classes/arc-type";
import {ImplicitResult} from "./classes/implicit-result";
import {TemplatePlace} from "./classes/template-place";
import {TemplateArc} from "./classes/template-arc";


export class ImplicitPlaceIdentifier {


    constructor(private _transitions: Array<string>, private _uniqueTraces: Array<EventlogTrace>) { // TODO -> Use partial orders instead?!
    }


    public calculateImplicitPlacesFor(currentPlace: Place, petriNet: PetriNet) : Array<ImplicitResult> { // TODO -> ggf Ersatzplatz einfügen
        // place without outgoing arcs is always implicit
        if (currentPlace.outgoingArcs.length === 0 || (currentPlace.ingoingArcs.length === 0 && currentPlace.marking === 0)) { // TODO passt das?
            return [new ImplicitResult(currentPlace)];
        }

        const implicitPlaces: Array<ImplicitResult> = [];
        const relatedPlaces = this.calculateRelatedPlaces(currentPlace, petriNet);

        for (const relatedPlace of relatedPlaces) {
            switch (this.testRelation(currentPlace, relatedPlace)) {
                // Neuer Platz eine Subregion vom relatedPlace
                case -1:
                        implicitPlaces.push(new ImplicitResult(relatedPlace, ImplicitPlaceIdentifier.buildCombinedPlace(relatedPlace, currentPlace)))
                    break;
                // Keine Beziehung zwischen den Plätzen
                case 0:
                    break
                // Neuer Platz eine Superregion vom relatedPlace
                case 1:
                    if (!implicitPlaces.map(value => value.implicitPlace).includes(currentPlace)) {
                        implicitPlaces.push(new ImplicitResult(currentPlace, ImplicitPlaceIdentifier.buildCombinedPlace(currentPlace, relatedPlace)))
                    } else {
                        // TODO build other combined places
                    }
                    break;
                default: // TODO check if all is still needed // TODO passt das?
                    // Places are behaving same related to the given eventlog
                    if(currentPlace.marking === relatedPlace.marking &&
                        this.isTransitionsEquals(currentPlace, relatedPlace, ArcType.INGOING)) {
                        if(this.isTransitionsEquals(currentPlace, relatedPlace, ArcType.OUTGOING)) {
                            // Equal places
                            implicitPlaces.push(new ImplicitResult(currentPlace));
                        } else {
                            // Equals incoming arcs but one place has more outgoings arc which are not used
                            if(currentPlace.outgoingArcs.length > relatedPlace.outgoingArcs.length) {
                                implicitPlaces.push(new ImplicitResult(currentPlace));
                            } else if (currentPlace.outgoingArcs.length < relatedPlace.outgoingArcs.length) {
                                implicitPlaces.push(new ImplicitResult(relatedPlace));
                            } else {
                                throw new Error("Unexpected place relation occurred in ImplicitPlaceIdentifier!")
                            }
                        }
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

    private static hasCommonTransition(p1: Place, p2: Place) {
        const p1Sources = p1.ingoingArcs.map(arc => arc.source)
        for (const p2InArc of p2.ingoingArcs) {
            const p2Source = p2InArc.source;
            if (p1Sources.includes(p2Source)) {
                return true;
            }
        }

        const p1Destinations = p1.outgoingArcs.map(arc => arc.destination)
        for(const p2OutArc of p2.outgoingArcs) {
            const p2Destination = p2OutArc.destination
            if(p1Destinations.includes(p2Destination)) {
                return true
            }
        }
        return false;
    }

    private isTransitionsEquals(p1: Place, p2: Place, arcType: ArcType) {
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

        const p1TransToArcs = reduceArcsToMapTransitionKeyArcValue(getArcs(arcType, p1));
        const p2TransToArcs = reduceArcsToMapTransitionKeyArcValue(getArcs(arcType, p1));

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
        let result = 2; // TODO nutzer lieber max / min && TODO cleanup --> was wenn 2 zurückgegeben wird?


        for (let trace of this._uniqueTraces) {
            p1 = new FireablePlace(place1)
            p2 = new FireablePlace(place2)

            // Compare markings before start TODO cleanup
            result = ImplicitPlaceIdentifier.compareMarkingsUpdateResult(p1, p2, result);
            if (result == 0) {
                return result;
            }

            for (let event of trace.events) {
                const activity = event.activity;

                //compare markings after consumption
                p1.consumeFire(activity);
                p2.consumeFire(activity);
                result = ImplicitPlaceIdentifier.compareMarkingsUpdateResult(p1, p2, result);
                if (result == 0) {
                    return result;
                }
                //compare markings after production
                p1.produceFire(activity);
                p2.produceFire(activity);
                result = ImplicitPlaceIdentifier.compareMarkingsUpdateResult(p1, p2, result);
                if (result == 0) {
                    return result;
                }
            }
        }
        return result;
    }

    private static compareMarkingsUpdateResult(p1: FireablePlace, p2: FireablePlace, resultBefore: number) {
        const tempResult = FireablePlace.compareMarkings(p1, p2) //-1 for p1<p2, 0 for p1=p2, 1=p1>p2
        switch (tempResult) { // TODO codestyle
            case -1: //p1<p2
                if (resultBefore == 2 || resultBefore == -1) {//first or consistent result
                    return -1;
                } else {
                    return 0;
                }
            case 0: //p1=p2
               return resultBefore;
            case 1: //p1>p2
                if (resultBefore == 2 || resultBefore == 1) {//first or consistent result
                    return 1;
                } else {
                    return 0;
                }
            default:
                return resultBefore;
        }
    }

// Build and check whether the place resulting from p1-p2 is valid TODO kein short loop support
    private static buildCombinedPlace(p1: Place, p2: Place): TemplatePlace { // TODO --> Funktioniert nicht bei short loops
        const resultingMarking = p1.marking - p2.marking; // TODO sinvolle id
        const p1Ingoing = reduceArcsToMapActivityKeyArcValue(p1.ingoingArcs)
        const p2Ingoing = reduceArcsToMapActivityKeyArcValue(p2.ingoingArcs)
        const p1Outgoing = reduceArcsToMapActivityKeyArcValue(p1.outgoingArcs)
        const p2Outgoing = reduceArcsToMapActivityKeyArcValue(p2.outgoingArcs)

        const relevantActivities = new Set([...p1Ingoing.keys()].concat([...p2Ingoing.keys()]).concat([...p1Outgoing.keys()]).concat([...p2Outgoing.keys()]))

        const unconnectedIngoingArcs : Array<TemplateArc> = [];
        const unconnectedOutgoingArcs : Array<TemplateArc> = [];

        for (const activity of relevantActivities) { // TODO cleanup
            let transition: Transition | undefined = undefined;
            let weight = 0;
            // Ingoing (positive)
            if (p1Ingoing.has(activity)) {
                transition = p1Ingoing.get(activity)!.source as Transition;
                weight = weight + p1Ingoing.get(activity)!.weight;
            }
            if (p2Ingoing.has(activity)) {
                transition = p2Ingoing.get(activity)!.source as Transition;
                weight = weight - p2Ingoing.get(activity)!.weight;

            }
            // Outgoing (negative)
            if (p1Outgoing.has(activity)) {
                transition = p1Outgoing.get(activity)!.destination as Transition;
                weight = weight - p1Outgoing.get(activity)!.weight;
            }
            if (p2Outgoing.has(activity)) {
                transition = p2Outgoing.get(activity)!.destination as Transition;
                weight = weight + (p2Outgoing.get(activity)!.weight);

            }

            if (transition == null) {
                throw new Error("Invalid state")
            }

            if (weight > 0) { // TODO validate weight
                unconnectedIngoingArcs.push(new TemplateArc(transition, undefined, weight))
            } else if (weight < 0) {
                unconnectedOutgoingArcs.push(new TemplateArc(undefined, transition, Math.abs(weight)))
            }
        }

        return new TemplatePlace(resultingMarking, unconnectedIngoingArcs, unconnectedOutgoingArcs); // TODO build instead of validate and VALIDATE
    }
}

class FireablePlace {
    private _ingoingActivityToArcs: Map<string, Arc>;
    private _outgoingActivityToArcs: Map<string, Arc>

    public currentTokens: number;


    constructor(private place: Place) {
        this._ingoingActivityToArcs = reduceArcsToMapActivityKeyArcValue(place.ingoingArcs)
        this._outgoingActivityToArcs = reduceArcsToMapActivityKeyArcValue(place.outgoingArcs)
        this.currentTokens = place.marking;
    }

    public produceFire(activity: string) {
        if (this._ingoingActivityToArcs.has(activity)) {
            this.currentTokens += this._ingoingActivityToArcs.get(activity)!.weight;
        }
    }

    public consumeFire(activity: string) {
        if (this._outgoingActivityToArcs.has(activity)) {
            this.currentTokens -= this._outgoingActivityToArcs.get(activity)!.weight;
        }
    }

    public static compareMarkings(p1: FireablePlace, p2: FireablePlace) {
        let result = 0;
        const compareValue = p1.currentTokens - p2.currentTokens;
        if (compareValue < 0) { //p1 has less tokens than p2
            result = -1;
        } else if (compareValue > 0) { //p1 has more tokens than p2
            result = 1;
        }
        return result;
    }
}
