import { TestBed } from '@angular/core/testing';
import { ImplicitPlaceIdentifier } from './implicit-place-identifier';
import { PetriNetParser } from '../../../parser/petri-net/petri-net-parser';
import { EventlogTrace } from '../../../models/eventlog/eventlog-trace';
import { EventlogEvent } from '../../../models/eventlog/eventlog-event';

describe('ImplicitPlaceRemoverService', () => {
    let netParser: PetriNetParser;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        netParser = new PetriNetParser();
    });

    it('should identify implicit places', () => {
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
        const transitionActivities = net
            .getTransitions()
            .map(transition => transition.label)
            .filter(transitionActivity => transitionActivity != null)
            .map(transitionActivity => transitionActivity!);
        const traces = [
            new EventlogTrace(
                [],
                [
                    new EventlogEvent([], 't1'),
                    new EventlogEvent([], 't2'),
                    new EventlogEvent([], 't3'),
                    new EventlogEvent([], 't4'),
                ],
                0
            ),
        ];
        const implicitPlaceIdentifier = new ImplicitPlaceIdentifier(
            transitionActivities,
            traces
        );

        const p1 = net.getPlaces().filter(place => place.id === 'p1')[0];

        const result = implicitPlaceIdentifier.calculateImplicitPlacesFor(
            p1,
            net
        );

        expect(result.length).toEqual(1);
        expect(result.map(result => result.implicitPlace)[0]).toEqual(p1);
        const substitutePlace = result.map(result => result.substitutePlace)[0];
        expect(substitutePlace?._marking).toEqual(0);
        expect(
            substitutePlace?._unconnectedIngoingTemplateArcs?.length
        ).toEqual(1);
        expect(
            substitutePlace?._unconnectedIngoingTemplateArcs[0]._weight
        ).toEqual(2);

        expect(
            substitutePlace?._unconnectedOutgoingTemplateArcs?.length
        ).toEqual(2);
        substitutePlace?._unconnectedOutgoingTemplateArcs?.forEach(tArc =>
            expect(tArc._weight).toEqual(1)
        );
    });
});
