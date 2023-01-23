// import { XesParser } from '../../parser/eventlog/xesParser';
// import { Eventlog } from '../../models/eventlog/eventlog';
// import { RstMinerSettings } from '../../models/miner-settings/rst-miner-settings';
// import {
//     isSameState,
//     PetriNetStateReachedTerminationConfig,
// } from '../../models/miner-settings/termination-condition-config';
// import {
//     getKnowPetriNetString,
//     StandardProcessModelNetType,
// } from '../../models/miner-settings/standard-pm-nets/standard-process-model-net-type';
// import { TemplatePlace } from '../petri-net/transformation/classes/template-place';
// import { PetriNetParser } from '../../parser/petri-net/petri-net-parser';
// import { RstMiner } from './rst-miner';
// import { expect } from '@angular/flex-layout/_private-utils/testing';
//
// describe('rST-Miner-Test', () => {
//
//     // Test läuft Lokal aber nicht in der Pipeline
//
//     it('simple mining test', () => {
//         const eventlog = parseXesFile(
//             'src/assets/log-files/xes/repairExample.xes'
//         );
//         const repairExamplePetriNetString = getKnowPetriNetString(
//             StandardProcessModelNetType.REPAIR_EXAMPLE
//         );
//         const repairExampleNet = new PetriNetParser().parse(
//             repairExamplePetriNetString
//         )!;
//         const toBeReachedTemplatePlaces = repairExampleNet
//             .getPlaces()
//             .map(place => TemplatePlace.of(place));
//
//         const minersettings = new RstMinerSettings();
//         minersettings.terminationCondition =
//             new PetriNetStateReachedTerminationConfig(
//                 repairExamplePetriNetString
//             );
//         const result = new RstMiner(minersettings).mine(eventlog)!;
//
//         expect(
//             isSameState(
//                 result.petriNet,
//                 repairExampleNet,
//                 toBeReachedTemplatePlaces
//             )
//         ).toBeTrue();
//     });
//
//     function parseXesFile(path: string): Eventlog {
//         const request = new XMLHttpRequest();
//         request.open('GET', 'base/' + path, false);
//         request.send(null);
//
//         const xesString = request.response.toString();
//         return new XesParser().parse(xesString);
//     }
// });
