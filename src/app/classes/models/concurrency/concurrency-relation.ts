import { Relabeler } from '../../utility/relabeler';
import { OccurenceMatrixType, OccurrenceMatrix } from './occurrence-matrix';
import { ConcurrencyMatrices, ConcurrencyMatrix } from './concurrency-matrix';

export class ConcurrencyRelation {
    private readonly _relabeler: Relabeler;
    private readonly _uniqueConcurrencyMatrix: ConcurrencyMatrix;
    private readonly _wildcardConcurrencyMatrix: ConcurrencyMatrix;
    private readonly _mixedConcurrencyMatrix: ConcurrencyMatrix;
    private readonly _wildCardLabels: Set<string>;

    protected constructor(relabeler: Relabeler) {
        this._uniqueConcurrencyMatrix = {};
        this._wildcardConcurrencyMatrix = {};
        this._mixedConcurrencyMatrix = {};
        this._wildCardLabels = new Set<string>();
        this._relabeler = relabeler.clone();
    }

    public static noConcurrency(
        relabeler: Relabeler = new Relabeler()
    ): ConcurrencyRelation {
        return new ConcurrencyRelation(relabeler);
    }

    public static fromOccurrenceMatrix(
        matrix: OccurrenceMatrix,
        relabeler: Relabeler
    ): ConcurrencyRelation {
        const result = new ConcurrencyRelation(relabeler);

        const keys = Array.from(matrix.keys);
        for (let i = 0; i < keys.length; i++) {
            const k1 = keys[i];
            for (let j = i + 1; j < keys.length; j++) {
                const k2 = keys[j];
                if (matrix.get(k1, k2) && matrix.get(k2, k1)) {
                    switch (matrix.type) {
                        case OccurenceMatrixType.UNIQUE:
                            result.setUniqueConcurrent(
                                k1,
                                k2,
                                matrix.getOccurrenceFrequency(k1, k2)!,
                                matrix.getOccurrenceFrequency(k2, k1)!
                            );
                            break;
                        case OccurenceMatrixType.WILDCARD:
                            result.setWildcardConcurrent(
                                k1,
                                k2,
                                matrix.getOccurrenceFrequency(k1, k2)!,
                                matrix.getOccurrenceFrequency(k2, k1)!
                            );
                            break;
                    }
                }
            }
        }

        return result;
    }

    public isConcurrent(labelA: string, labelB: string): boolean {
        const unique = this.read(this._uniqueConcurrencyMatrix, labelA, labelB);
        if (unique) {
            return true;
        }

        const wildcardA = this.getWildcard(labelA);
        const wildcardB = this.getWildcard(labelB);
        if (!wildcardA && !wildcardB) {
            return false;
        } else if (wildcardA && wildcardB) {
            return this.read(
                this._wildcardConcurrencyMatrix,
                wildcardA,
                wildcardB
            );
        } else if (wildcardA && !wildcardB) {
            return this.read(this._mixedConcurrencyMatrix, wildcardA, labelB);
        } else {
            return this.read(this._mixedConcurrencyMatrix, wildcardB!, labelA);
        }
    }
    public setUniqueConcurrent(
        uniqueLabelA: string,
        uniqueLabelB: string,
        frequencyAB: number,
        frequencyBA: number
    ): void;
    public setUniqueConcurrent(
        uniqueLabelA: string,
        uniqueLabelB: string,
        value: boolean | number = true,
        frequencyBA?: number
    ) {
        if (typeof value === 'boolean') {
            this.set(
                this._uniqueConcurrencyMatrix,
                uniqueLabelA,
                uniqueLabelB,
                value
            );
            this.set(
                this._uniqueConcurrencyMatrix,
                uniqueLabelB,
                uniqueLabelA,
                value
            );
        } else {
            this.set(
                this._uniqueConcurrencyMatrix,
                uniqueLabelA,
                uniqueLabelB,
                value
            );
            this.set(
                this._uniqueConcurrencyMatrix,
                uniqueLabelB,
                uniqueLabelA,
                frequencyBA!
            );
        }
    }

    public setWildcardConcurrent(
        wildcardLabelA: string,
        wildcardLabelB: string,
        concurrency?: boolean
    ): void;
    public setWildcardConcurrent(
        wildcardLabelA: string,
        wildcardLabelB: string,
        frequencyAB: number,
        frequencyBA: number
    ): void;
    public setWildcardConcurrent(
        wildcardLabelA: string,
        wildcardLabelB: string,
        value: boolean | number = true,
        frequencyBA?: number
    ) {
        if (typeof value === 'boolean') {
            this.set(
                this._wildcardConcurrencyMatrix,
                wildcardLabelA,
                wildcardLabelB,
                value
            );
            this.set(
                this._wildcardConcurrencyMatrix,
                wildcardLabelB,
                wildcardLabelA,
                value
            );
        } else {
            this.set(
                this._wildcardConcurrencyMatrix,
                wildcardLabelA,
                wildcardLabelB,
                value
            );
            this.set(
                this._wildcardConcurrencyMatrix,
                wildcardLabelB,
                wildcardLabelA,
                frequencyBA!
            );
        }

        this._wildCardLabels.add(wildcardLabelA);
        this._wildCardLabels.add(wildcardLabelB);
    }
    protected set(
        matrix: ConcurrencyMatrix,
        uniqueLabelA: string,
        uniqueLabelB: string,
        concurrency?: boolean
    ): void;
    protected set(
        matrix: ConcurrencyMatrix,
        uniqueLabelA: string,
        uniqueLabelB: string,
        frequency: number
    ): void;
    protected set(
        matrix: ConcurrencyMatrix,
        uniqueLabelA: string,
        uniqueLabelB: string,
        value: boolean | number = true
    ) {
        const row = matrix[uniqueLabelA];
        if (row === undefined) {
            matrix[uniqueLabelA] = { [uniqueLabelB]: value };
            return;
        }
        row[uniqueLabelB] = value;
    }

    protected read(
        matrix: ConcurrencyMatrix,
        row: string,
        column: string
    ): boolean {
        const matrixRow = matrix[row];
        if (matrixRow === undefined) {
            return false;
        }
        return !!matrixRow[column];
    }

    protected getWildcard(label: string): string | undefined {
        const undone = this.relabeler.undoLabel(label);
        if (this._wildCardLabels.has(undone)) {
            return undone;
        }
        return undefined;
    }

    get relabeler(): Relabeler {
        return this._relabeler;
    }

    public cloneConcurrencyMatrices(): ConcurrencyMatrices {
        return {
            unique: this.cloneMatrix(this._uniqueConcurrencyMatrix),
            wildcard: this.cloneMatrix(this._wildcardConcurrencyMatrix),
            mixed: this.cloneMatrix(this._mixedConcurrencyMatrix),
        };
    }

    protected cloneMatrix(matrix: ConcurrencyMatrix): ConcurrencyMatrix {
        const result = {};

        for (const row of Object.keys(matrix)) {
            for (const column of Object.keys(matrix[row])) {
                if (!matrix[row][column]) {
                    continue;
                }
                this.set(result, row, column, matrix[row][column] as number);
            }
        }

        return result;
    }
}
