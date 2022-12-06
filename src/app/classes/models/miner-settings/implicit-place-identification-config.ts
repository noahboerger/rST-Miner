import 'reflect-metadata';
import { jsonMember, jsonObject } from 'typedjson';

@jsonObject
export class ImplicitPlaceIdentificationConfig {
    public static readonly DEFAULT_IS_ENABLED = true;

    public static readonly DEFAULT_IS_CALCULATE_SUBSTITUTE_PLACES_ENABLED =
        true;

    public static readonly DEFAULT_IS_VALIDATE_SUBSTITUTE_ARC_WEIGHTS_ENABLED =
        true;

    public static readonly DEFAULT_IS_MAX_DEEPNESS_ENABLED = false;

    public static readonly DEFAULT_MAX_DEEPNESS = 3;

    @jsonMember(Boolean)
    public isPlaceRemovalEnabled: boolean;

    @jsonMember(Boolean)
    public isCalculateSubstitutePlacesEnabled: boolean;

    @jsonMember(Boolean)
    public isValidateSubstituteArcWeightsEnabled: boolean;

    @jsonMember(Boolean)
    public isMaxDeepnessEnabled: boolean;

    @jsonMember(Number)
    private _maxDeepness: number;

    constructor(
        isEnabled: boolean = ImplicitPlaceIdentificationConfig.DEFAULT_IS_ENABLED,
        isCalculateSubstitutePlacesEnabled: boolean = ImplicitPlaceIdentificationConfig.DEFAULT_IS_CALCULATE_SUBSTITUTE_PLACES_ENABLED,
        isValidateSubstituteArcWeightsEnabled: boolean = ImplicitPlaceIdentificationConfig.DEFAULT_IS_VALIDATE_SUBSTITUTE_ARC_WEIGHTS_ENABLED,
        isMaxDeepnessEnabled: boolean = ImplicitPlaceIdentificationConfig.DEFAULT_IS_MAX_DEEPNESS_ENABLED,
        maxDeepness: number = ImplicitPlaceIdentificationConfig.DEFAULT_MAX_DEEPNESS
    ) {
        this.isPlaceRemovalEnabled = isEnabled;
        this.isCalculateSubstitutePlacesEnabled =
            isCalculateSubstitutePlacesEnabled;
        this.isValidateSubstituteArcWeightsEnabled =
            isValidateSubstituteArcWeightsEnabled;
        this.isMaxDeepnessEnabled = isMaxDeepnessEnabled;
        this._maxDeepness = maxDeepness;
    }

    get maxDeepness(): number {
        return this._maxDeepness;
    }

    set maxDeepness(value: number) {
        if (value < 1) {
            this._maxDeepness =
                ImplicitPlaceIdentificationConfig.DEFAULT_MAX_DEEPNESS;
        } else {
            this._maxDeepness = value;
        }
    }
}
