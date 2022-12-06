import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class ProcessModelCharacteristicsConfig {
    public static readonly DEFAULT_PLACES_EMPTY_AT_END = false;
    public static readonly DEFAULT_WORKFLOW_NET = false;

    @jsonMember(Boolean)
    public placesEmptyAtEnd: boolean;

    @jsonMember(Boolean)
    public workflowNet: boolean;

    constructor(
        placesEmptyAtEnd: boolean = ProcessModelCharacteristicsConfig.DEFAULT_PLACES_EMPTY_AT_END,
        workflowNet: boolean = ProcessModelCharacteristicsConfig.DEFAULT_WORKFLOW_NET
    ) {
        this.placesEmptyAtEnd = placesEmptyAtEnd;
        this.workflowNet = workflowNet;
    }
}
