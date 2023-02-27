import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';
import { PrimitivePlaceGenerator } from '../../algorithms/rst-miner/generators/primitive-place-generator';
import { RandomPlaceGenerator } from '../../algorithms/rst-miner/generators/random-place-generator';
import { GeometricPlaceGenerator } from '../../algorithms/rst-miner/generators/geometric-place-generator';

// Interfaces werden von typedjson nicht unterstützt, deshalb wird hier eine abstrakte Klasse genutzt
export abstract class RandomPlaceGeneratorConfig {
    abstract get simpleName(): string;

    abstract buildRandomPlaceGenerator(): RandomPlaceGenerator;

    abstract get maximalIngoingArcWeights(): number;

    abstract get maximalOutgoingArcWeights(): number;
}

@jsonObject
export class PrimitiveGeneratorConfig extends RandomPlaceGeneratorConfig {
    public static readonly SIMPLE_NAME = 'Primitive';

    public static readonly DEFAULT_MAXIMAL_INITIAL_MARKING = 0;

    public static readonly DEFAULT_INGOING_CONNECTION_PROBABILITY = 0.25;
    public static readonly DEFAULT_OUTGOING_CONNECTION_PROBABILITY = 0.25;

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

    get simpleName(): string {
        return PrimitiveGeneratorConfig.SIMPLE_NAME;
    }

    get ingoingConnectionProbability(): number {
        return this._ingoingConnectionProbability;
    }

    set ingoingConnectionProbability(value: number) {
        if (value == null || value < 0 || value > 1) {
            this._ingoingConnectionProbability =
                PrimitiveGeneratorConfig.DEFAULT_INGOING_CONNECTION_PROBABILITY;
        } else {
            this._ingoingConnectionProbability = value;
        }
    }

    get outgoingConnectionProbability(): number {
        return this._outgoingConnectionProbability;
    }

    set outgoingConnectionProbability(value: number) {
        if (value == null || value < 0 || value > 1) {
            this._outgoingConnectionProbability =
                PrimitiveGeneratorConfig.DEFAULT_OUTGOING_CONNECTION_PROBABILITY;
        } else {
            this._outgoingConnectionProbability = value;
        }
    }

    get maximalInitialMarking(): number {
        return this._maximalInitialMarking;
    }

    set maximalInitialMarking(value: number) {
        if (value == null || value < 0 || value > 100) {
            this._maximalInitialMarking =
                PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INITIAL_MARKING;
        } else {
            this._maximalInitialMarking = value;
        }
    }

    get maximalIngoingArcWeights(): number {
        return this._maximalIngoingArcWeights;
    }

    set maximalIngoingArcWeights(value: number) {
        if (value == null || value < 1 || value > 100) {
            this._maximalIngoingArcWeights =
                PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS;
        } else {
            this._maximalIngoingArcWeights = value;
        }
    }

    get maximalOutgoingArcWeights(): number {
        return this._maximalOutgoingArcWeights;
    }

    set maximalOutgoingArcWeights(value: number) {
        if (value == null || value < 1 || value > 100) {
            this._maximalOutgoingArcWeights =
                PrimitiveGeneratorConfig.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS;
        } else {
            this._maximalOutgoingArcWeights = value;
        }
    }

    buildRandomPlaceGenerator(): PrimitivePlaceGenerator {
        return new PrimitivePlaceGenerator(
            this._maximalInitialMarking,
            this._ingoingConnectionProbability,
            this._outgoingConnectionProbability,
            this._maximalIngoingArcWeights,
            this._maximalOutgoingArcWeights
        );
    }
}

@jsonObject
export class GeometricDistributionGeneratorConfig extends RandomPlaceGeneratorConfig {
    public static readonly SIMPLE_NAME = 'Geometric Distribution';

    public static readonly DEFAULT_MAXIMAL_INITIAL_MARKING = 0;
    public static readonly DEFAULT_GEOMETRIC_INCREASE_INITIAL_MARKING_PROBABILITY = 0.5;
    public static readonly DEFAULT_GEOMETRIC_INCREASE_ARCS_PROBABILITY = 0.65;
    public static readonly DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS = 1;
    public static readonly DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS = 1;

    @jsonMember(Number)
    private _maximalInitialMarking: number;

    @jsonMember(Number)
    private _geometricIncreaseInitialMarkingProbability: number;

    @jsonMember(Number)
    private _geometricIncreaseArcsProbability: number;

    @jsonMember(Number)
    private _maximalIngoingArcWeights: number;

    @jsonMember(Number)
    private _maximalOutgoingArcWeights: number;

    constructor(
        maximalInitialMarking: number = GeometricDistributionGeneratorConfig.DEFAULT_MAXIMAL_INITIAL_MARKING,
        geometricIncreaseInitialMarkingProbability: number = GeometricDistributionGeneratorConfig.DEFAULT_GEOMETRIC_INCREASE_INITIAL_MARKING_PROBABILITY,
        geometricIncreaseArcsProbability: number = GeometricDistributionGeneratorConfig.DEFAULT_GEOMETRIC_INCREASE_ARCS_PROBABILITY,
        maximalIngoingArcWeights: number = GeometricDistributionGeneratorConfig.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS,
        maximalOutgoingArcWeights: number = GeometricDistributionGeneratorConfig.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS
    ) {
        super();
        this._maximalInitialMarking = maximalInitialMarking;
        this._geometricIncreaseInitialMarkingProbability =
            geometricIncreaseInitialMarkingProbability;
        this._geometricIncreaseArcsProbability =
            geometricIncreaseArcsProbability;
        this._maximalIngoingArcWeights = maximalIngoingArcWeights;
        this._maximalOutgoingArcWeights = maximalOutgoingArcWeights;
    }

    get simpleName(): string {
        return GeometricDistributionGeneratorConfig.SIMPLE_NAME;
    }

    get geometricIncreaseInitialMarkingProbability(): number {
        return this._geometricIncreaseInitialMarkingProbability;
    }

    set geometricIncreaseInitialMarkingProbability(value: number) {
        if (value == null || value < 0 || value > 1) {
            this._geometricIncreaseInitialMarkingProbability =
                GeometricDistributionGeneratorConfig.DEFAULT_GEOMETRIC_INCREASE_INITIAL_MARKING_PROBABILITY;
        } else {
            this._geometricIncreaseInitialMarkingProbability = value;
        }
    }

    get geometricIncreaseArcsProbability(): number {
        return this._geometricIncreaseArcsProbability;
    }

    set geometricIncreaseArcsProbability(value: number) {
        if (value == null || value < 0 || value > 1) {
            this._geometricIncreaseArcsProbability =
                GeometricDistributionGeneratorConfig.DEFAULT_GEOMETRIC_INCREASE_ARCS_PROBABILITY;
        } else {
            this._geometricIncreaseArcsProbability = value;
        }
    }

    get maximalInitialMarking(): number {
        return this._maximalInitialMarking;
    }

    set maximalInitialMarking(value: number) {
        if (value == null || value < 0 || value > 100) {
            this._maximalInitialMarking =
                GeometricDistributionGeneratorConfig.DEFAULT_MAXIMAL_INITIAL_MARKING;
        } else {
            this._maximalInitialMarking = value;
        }
    }

    get maximalIngoingArcWeights(): number {
        return this._maximalIngoingArcWeights;
    }

    set maximalIngoingArcWeights(value: number) {
        if (value == null || value < 1 || value > 100) {
            this._maximalIngoingArcWeights =
                GeometricDistributionGeneratorConfig.DEFAULT_MAXIMAL_INGOING_ARC_WEIGHTS;
        } else {
            this._maximalIngoingArcWeights = value;
        }
    }

    get maximalOutgoingArcWeights(): number {
        return this._maximalOutgoingArcWeights;
    }

    set maximalOutgoingArcWeights(value: number) {
        if (value == null || value < 1 || value > 100) {
            this._maximalOutgoingArcWeights =
                GeometricDistributionGeneratorConfig.DEFAULT_MAXIMAL_OUTGOING_ARC_WEIGHTS;
        } else {
            this._maximalOutgoingArcWeights = value;
        }
    }

    buildRandomPlaceGenerator(): GeometricPlaceGenerator {
        return new GeometricPlaceGenerator(
            this._maximalInitialMarking,
            this._geometricIncreaseInitialMarkingProbability,
            this._geometricIncreaseArcsProbability,
            this._maximalIngoingArcWeights,
            this._maximalOutgoingArcWeights
        );
    }
}
