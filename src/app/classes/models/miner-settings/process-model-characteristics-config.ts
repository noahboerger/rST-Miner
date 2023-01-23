import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class ProcessModelCharacteristicsConfig {
    public static readonly DEFAULT_PLACES_EMPTY_AT_END = true;

    @jsonMember(Boolean)
    public placesEmptyAtEnd: boolean;

    constructor(
        placesEmptyAtEnd: boolean = ProcessModelCharacteristicsConfig.DEFAULT_PLACES_EMPTY_AT_END,
    ) {
        this.placesEmptyAtEnd = placesEmptyAtEnd;
    }
}
