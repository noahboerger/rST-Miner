import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import { PrimitivePlaceGenerator } from '../../algorithms/rst-miner/generators/primitive-place-generator';
import { RandomPlaceGenerator } from '../../algorithms/rst-miner/generators/random-place-generator';

// Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt
export abstract class RandomPlaceGeneratorConfig {
    abstract getSimpleName(): string;

    abstract buildRandomPlaceGenerator(): RandomPlaceGenerator;
}

@jsonObject
export class PrimitiveGeneratorConfig extends RandomPlaceGeneratorConfig {
    public static readonly SIMPLE_NAME = 'Primitive';

    public static readonly DEFAULT_PROBABILITY = 0.5; // TODO

    @jsonMember(Number)
    private _probability: number;

    constructor(
        probability: number = PrimitiveGeneratorConfig.DEFAULT_PROBABILITY
    ) {
        super();
        this._probability = probability;
    }

    getSimpleName(): string {
        return PrimitiveGeneratorConfig.SIMPLE_NAME;
    }

    get probability(): number {
        return this._probability;
    }

    set probability(value: number) {
        if (value == null || value <= 0 || value >= 1) {
            this._probability = PrimitiveGeneratorConfig.DEFAULT_PROBABILITY;
        } else {
            this._probability = value;
        }
    }

    buildRandomPlaceGenerator(): PrimitivePlaceGenerator {
        return new PrimitivePlaceGenerator(this._probability);
    }
}

// TODO implement real generators
