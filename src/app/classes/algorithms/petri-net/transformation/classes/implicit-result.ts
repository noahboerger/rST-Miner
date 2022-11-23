import { Place } from '../../../../models/petri-net/place';
import { TemplatePlace } from './template-place';

export class ImplicitResult {
    constructor(
        public implicitPlace: Place,
        public substitutePlace: TemplatePlace | undefined = undefined
    ) {}
}
