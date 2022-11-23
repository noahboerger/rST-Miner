import { PetriNet } from '../../../models/petri-net/petri-net';
import { OccurrenceMatrix } from '../../../models/concurrency/occurrence-matrix';

export interface TraceConversionResult {
    nets: Array<PetriNet>;
    occurrenceMatrix: OccurrenceMatrix;
}
