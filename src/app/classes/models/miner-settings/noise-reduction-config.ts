import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import { Eventlog } from '../eventlog/eventlog';

// Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt
export abstract class NoiseReductionConfig {
    abstract getSimpleName(): string;

    abstract preFilterNoise(unfiltered: Eventlog): Eventlog;

    // TODO return place evaluation percentage and assign
}

@jsonObject
export class NoNoiseReductionConfig extends NoiseReductionConfig {
    public static readonly SIMPLE_NAME = 'None ';

    getSimpleName(): string {
        return NoNoiseReductionConfig.SIMPLE_NAME;
    }

    preFilterNoise(toBeFiltered: Eventlog): Eventlog {
        return toBeFiltered;
    }
}

@jsonObject
export class PreprocessingNoiseReductionConfig extends NoiseReductionConfig {
    public static readonly SIMPLE_NAME = 'Preprocessing ';

    public static readonly DEFAULT_FITTING_PROPORTION = 0.8;

    @jsonMember(Number)
    private _fittingProportion: number;

    constructor(
        fittingProportion: number = PreprocessingNoiseReductionConfig.DEFAULT_FITTING_PROPORTION
    ) {
        super();
        this._fittingProportion = fittingProportion;
    }

    getSimpleName(): string {
        return PreprocessingNoiseReductionConfig.SIMPLE_NAME;
    }

    get fittingProportion(): number {
        return this._fittingProportion;
    }

    set fittingProportion(value: number) {
        if (value < 0 || value > 1) {
            this._fittingProportion =
                PreprocessingNoiseReductionConfig.DEFAULT_FITTING_PROPORTION;
        } else {
            this._fittingProportion = value;
        }
    }

    preFilterNoise(toBeFiltered: Eventlog): Eventlog {
        const numContainedTraces = toBeFiltered.traces.length;

        const traceVariants = toBeFiltered.sortedTraceVariants;

        // take mostly occurred variants until limit reached, then only take the ones with last taken occurrences
        let alreadyProcessed = 0;
        let alsoTake = -1;
        const relevantTraces = traceVariants
            .filter(value => {
                const take =
                    alreadyProcessed / numContainedTraces <
                        this._fittingProportion || value.length == alsoTake;
                alreadyProcessed += value.length;
                if (take) {
                    alsoTake = value.length;
                }
                return take;
            })
            .flatMap(value => value);

        toBeFiltered.traces = relevantTraces;
        return toBeFiltered;
    }
}

@jsonObject
export class PlaceEvaluationNoiseReductionConfig extends NoiseReductionConfig {
    public static readonly SIMPLE_NAME = 'Place Evaluation';

    public static readonly DEFAULT_FITTING_PROPORTION = 0.8;

    @jsonMember(Number)
    private _fittingProportion: number;

    constructor(
        fittingProportion: number = PlaceEvaluationNoiseReductionConfig.DEFAULT_FITTING_PROPORTION
    ) {
        super();
        this._fittingProportion = fittingProportion;
    }

    getSimpleName(): string {
        return PlaceEvaluationNoiseReductionConfig.SIMPLE_NAME;
    }

    get fittingProportion(): number {
        return this._fittingProportion;
    }

    set fittingProportion(value: number) {
        if (value < 0 || value > 1) {
            this._fittingProportion =
                PlaceEvaluationNoiseReductionConfig.DEFAULT_FITTING_PROPORTION;
        } else {
            this._fittingProportion = value;
        }
    }

    preFilterNoise(toBeFiltered: Eventlog): Eventlog {
        return toBeFiltered;
    }
}
