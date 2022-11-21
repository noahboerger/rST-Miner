import {TestBed} from '@angular/core/testing';
import {ImplicitPlaceIdentifier} from './implicit-place-identifier';
import {PetriNetParser} from "../../../parser/petri-net/petri-net-parser";
import {EventlogTrace} from "../../../models/eventlog/eventlog-trace";
import {EventlogEvent} from "../../../models/eventlog/eventlog-event";

describe('ImplicitPlaceRemoverService', () => {
    let netParser: PetriNetParser;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        netParser = new PetriNetParser();
    });


    it('should remove implicit places', () => {
        let net = netParser.parse(`.type pn
.places
p1 0
p2 0
p3 0
p4 0
.transitions
t1 t1
t2 t2
t3 t3
t4 t4
.arcs
t1 p1
t1 p2
t2 p1
t2 p3
t3 p4
p1 t3
p1 t4
p2 t2
p3 t3
p4 t4`)!;
        const transitionActivities = net.getTransitions().map(transition => transition.label)
            .filter(transitionActivity => transitionActivity != null)
            .map(transitionActivity => transitionActivity!)
        const traces = [new EventlogTrace([], [new EventlogEvent([], "t1"), new EventlogEvent([], "t2"), new EventlogEvent([], "t3"), new EventlogEvent([], "t4")], 0)];
        const implicitPlaceIdentifier = new ImplicitPlaceIdentifier(transitionActivities, traces)

        const p1 = net.getPlaces().filter(place => place.id === "p1")[0];

         const result = implicitPlaceIdentifier.calculateImplicitPlacesFor(p1, net);
         console.log(result)

        // expect(noImplicit).toBeTruthy();
        // expect(noImplicit.getTransitions().length).toBe(3);
        // expect(noImplicit.getPlaces().length).toBe(4); TODO
        // expect(noImplicit.getArcs().length).toBe(6);
        // expect(noImplicit.getPlaces().every(p => p.id !== 'x')).toBeTrue();

//         net = netParser.parse(`.type pn TODO
// .places
// s 1
// z 0
// x 0
// a 0
// b 0
// c 0
// .transitions
// A A
// B B
// C C
// D D
// .arcs
// s A
// A x
// A a
// a B
// B b
// b C
// C c
// x D
// c D
// D z`)!;
//
//         noImplicit = service.removeImplicitPlaces(net)
//
//         expect(noImplicit).toBeTruthy();
//         expect(noImplicit.getTransitions().length).toBe(4);
//         expect(noImplicit.getPlaces().length).toBe(5);
//         expect(noImplicit.getArcs().length).toBe(8);
//         expect(noImplicit.getPlaces().every(p => p.id !== 'x')).toBeTrue();
//     });
//
//     it('should keep non-implicit places', () => {
//         let net = netParser.parse(`.type pn
// .places
// s 1
// z 0
// x 0
// y 0
// a 0
// b 0
// .transitions
// A A
// B B
// C C
// X X
// Y Y
// .arcs
// s A
// A x
// A a
// a B
// B b
// b C
// C z
// x C
// x X
// X y
// y Y
// Y x`)!;
//
//         let noImplicit = service.removeImplicitPlaces(net)
//
//         expect(noImplicit).toBeTruthy();
//         expect(noImplicit.getTransitions().length).toBe(5);
//         expect(noImplicit.getPlaces().length).toBe(6);
//         expect(noImplicit.getArcs().length).toBe(12);
//
//         net = netParser.parse(`.type pn
// .places
// s 1
// z 0
// a1 0
// a2 0
// b1 0
// b2 0
// c1 0
// c2 0
// .transitions
// A A
// B B
// C C
// S S
// Z Z
// .arcs
// s S
// S a1
// S b1
// S c1
// a1 A
// A a2
// b1 B
// B b2
// c1 C
// C c2
// a2 Z
// b2 Z
// c2 Z
// Z z`)!;
//
//         noImplicit = service.removeImplicitPlaces(net)
//
//         expect(noImplicit).toBeTruthy();
//         expect(noImplicit.getTransitions().length).toBe(5);
//         expect(noImplicit.getPlaces().length).toBe(8);
//         expect(noImplicit.getArcs().length).toBe(14);
    });

});
