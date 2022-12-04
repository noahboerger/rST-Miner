import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import { LogToPartialOrderTransformerConfiguration } from '../../algorithms/concurrency-oracle/log-to-partial-order-transformer';

@jsonObject
export class PartialOrderTransformationConfig {
    public static readonly DEFAULT_CLEAN_LIFECYCLE = true;
    public static readonly DEFAULT_ADD_START_STOP_EVENT = false;
    public static readonly DEFAULT_DISCARD_PREFIXES = false;

    @jsonMember(Boolean)
    public cleanLifecycle: boolean;

    @jsonMember(Boolean)
    public addStartStopEvent: boolean;

    @jsonMember(Boolean)
    public discardPrefixes: boolean;

    constructor(
        cleanLifecycle: boolean = PartialOrderTransformationConfig.DEFAULT_CLEAN_LIFECYCLE,
        addStartStopEvent: boolean = PartialOrderTransformationConfig.DEFAULT_ADD_START_STOP_EVENT,
        discardPrefixes: boolean = PartialOrderTransformationConfig.DEFAULT_DISCARD_PREFIXES
    ) {
        this.cleanLifecycle = cleanLifecycle;
        this.addStartStopEvent = addStartStopEvent;
        this.discardPrefixes = discardPrefixes;
    }

    toConfig(): LogToPartialOrderTransformerConfiguration {
        return {
            cleanLog: this.cleanLifecycle,
            addStartStopEvent: this.addStartStopEvent,
            discardPrefixes: this.discardPrefixes,
        };
    }
}
