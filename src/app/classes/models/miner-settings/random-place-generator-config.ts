import 'reflect-metadata';
import {jsonMember, jsonObject} from 'typedjson';
import {PrimitivePlaceGenerator} from '../../algorithms/rst-miner/generators/primitive-place-generator';
import {RandomPlaceGenerator} from '../../algorithms/rst-miner/generators/random-place-generator';

// Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt
export abstract class RandomPlaceGeneratorConfig {
    abstract getSimpleName(): string;

    abstract buildRandomPlaceGenerator(): RandomPlaceGenerator;
}

@jsonObject
export class PrimitiveGeneratorConfig extends RandomPlaceGeneratorConfig {
    public static readonly SIMPLE_NAME = 'Primitive';

    public static readonly DEFAULT_MAXIMAL_INITIAL_MARKING = 1;

    public static readonly DEFAULT_INGOING_CONNECTION_PROBABILITY = 0.3;
    public static readonly DEFAULT_OUTGOING_CONNECTION_PROBABILITY = 0.3;

    public static readonly DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS = 1;
    public static readonly DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS = 1;

    @jsonMember(Number)
    private _maximalInitialMarking: number;

    @jsonMember(Number)
    private _ingoingConnectionProbability: number;

    @jsonMember(Number)
    private _outgoingConnectionProbability: number;

    @jsonMember(Number)
    private _maximalIngoingArcWeights: number;

    @jsonMember(Number)
    private _maximalOutgoingArcWeights: number;

    constructor(
        maximalInitialMarking: number = PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INITIAL_MARKING,
        ingoingConnectionProbability: number = PrimitiveGeneratorConfig.DEFAULT_INGOING_CONNECTION_PROBABILITY,
        outgoingConnectionProbability: number = PrimitiveGeneratorConfig.DEFAULT_OUTGOING_CONNECTION_PROBABILITY,
        maximalIngoingArcWeights: number = PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS,
        maximalOutgoingArcWeights: number = PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS
    ) {
        super();
        this._maximalInitialMarking = maximalInitialMarking;
        this._ingoingConnectionProbability = ingoingConnectionProbability;
        this._outgoingConnectionProbability = outgoingConnectionProbability;
        this._maximalIngoingArcWeights = maximalIngoingArcWeights;
        this._maximalOutgoingArcWeights = maximalOutgoingArcWeights;
    }

    getSimpleName(): string {
        return PrimitiveGeneratorConfig.SIMPLE_NAME;
    }

    get ingoingConnectionProbability(): number {
        return this._ingoingConnectionProbability;
    }

    set ingoingConnectionProbability(value: number) {
        if (value == null || value < 0 || value > 1) {
            this._ingoingConnectionProbability = PrimitiveGeneratorConfig.DEFAULT_INGOING_CONNECTION_PROBABILITY;
        } else {
            this._ingoingConnectionProbability = value;
        }
    }

    get outgoingConnectionProbability(): number {
        return this._outgoingConnectionProbability;
    }

    set outgoingConnectionProbability(value: number) {
        if (value == null || value < 0 || value > 1) { // TODO
            this._outgoingConnectionProbability = PrimitiveGeneratorConfig.DEFAULT_OUTGOING_CONNECTION_PROBABILITY;
        } else {
            this._outgoingConnectionProbability = value;
        }
    }

    get maximalInitialMarking(): number {
        return this._maximalInitialMarking;
    }

    set maximalInitialMarking(value: number) {
        if (value == null || value < 0 || value > 100) {
            this._maximalInitialMarking = PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INITIAL_MARKING;
        } else {
            this._maximalInitialMarking = value;
        }
    }

    get maximalIngoingArcWeights(): number {
        return this._maximalIngoingArcWeights;
    }

    set maximalIngoingArcWeights(value: number) {
        if (value == null || value < 1 || value > 100) {
            this._maximalIngoingArcWeights = PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS;
        } else {
            this._maximalIngoingArcWeights = value;
        }
    }

    get maximalOutgoingArcWeights(): number {
        return this._maximalOutgoingArcWeights;
    }

    set maximalOutgoingArcWeights(value: number) {
        if (value == null || value < 1 || value > 100) {
            this._maximalOutgoingArcWeights = PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS;
        } else {
            this._maximalOutgoingArcWeights = value;
        }
    }

    buildRandomPlaceGenerator(): PrimitivePlaceGenerator {
        return new PrimitivePlaceGenerator(this._maximalInitialMarking, this._ingoingConnectionProbability, this._outgoingConnectionProbability, this._maximalIngoingArcWeights, this._maximalOutgoingArcWeights);
    }
}

// TODO implement real generators
