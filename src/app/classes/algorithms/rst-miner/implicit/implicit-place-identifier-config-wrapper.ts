import { ImplicitPlaceIdentifier } from '../../petri-net/transformation/implicit-place-identifier';
import { Place } from '../../../models/petri-net/place';
import { PetriNet } from '../../../models/petri-net/petri-net';
import { TemplatePlace } from '../../petri-net/transformation/classes/template-place';
import { EventlogTrace } from '../../../models/eventlog/eventlog-trace';
import { ImplicitPlaceIdentificationConfig } from '../../../models/miner-settings/implicit-place-identification-config';
import { RstMinerSettings } from '../../../models/miner-settings/rst-miner-settings';

export class ImplicitPlaceIdentifierConfigWrapper {
    private _alreadyImplicitPlaces = new Set<string>();
    private _implicitPlaceIdentifier: ImplicitPlaceIdentifier;
    private _implicitPlaceIdentificationConfig: ImplicitPlaceIdentificationConfig;
    private readonly maxIngoingArcWeights: number;
    private readonly maxOutgoingArcWeights: number;

    constructor(
        allTransitionActivities: Array<string>,
        allContainedTraces: EventlogTrace[],
        rstMinerSettings: RstMinerSettings
    ) {
        this._implicitPlaceIdentifier = new ImplicitPlaceIdentifier(
            allTransitionActivities,
            allContainedTraces
        );
        this._implicitPlaceIdentificationConfig =
            rstMinerSettings.implicitPlaceIdentification;
        this.maxIngoingArcWeights =
            rstMinerSettings.randomPlaceGenerator.maximalIngoingArcWeights;
        this.maxOutgoingArcWeights =
            rstMinerSettings.randomPlaceGenerator.maximalOutgoingArcWeights;
    }

    public removeImplicitPlacesForAndIncreaseCounter(
        addedPlace: Place,
        petriNet: PetriNet,
        counter: number
    ): number {
        return this.internalRemoveImplicitPlacesForAndIncreaseCounter(
            addedPlace,
            petriNet,
            counter,
            this._implicitPlaceIdentificationConfig.maxDeepness
        );
    }

    private internalRemoveImplicitPlacesForAndIncreaseCounter(
        addedPlace: Place,
        petriNet: PetriNet,
        counter: number,
        maxRemainingDept: number
    ): number {
        if (
            this._alreadyImplicitPlaces.has(
                TemplatePlace.toSameUniqueString(addedPlace)
            )
        ) {
            petriNet.removePlace(addedPlace);
            return counter;
        }

        let implicitPlaces =
            this._implicitPlaceIdentifier.calculateImplicitPlacesFor(
                addedPlace,
                petriNet
            );

        if (
            this._implicitPlaceIdentificationConfig
                .isValidateSubstituteArcWeightsEnabled
        ) {
            implicitPlaces = implicitPlaces.filter(implicitResult =>
                this.checkSubstitutePlacesAreValidOrEmpty(
                    implicitResult.substitutePlaces
                )
            );
        }
        // remove all implicit places
        implicitPlaces.forEach(implicitResult => {
            this._alreadyImplicitPlaces.add(
                TemplatePlace.toSameUniqueString(implicitResult.implicitPlace)
            );
            petriNet.removePlace(implicitResult.implicitPlace);
        });

        if (
            this._implicitPlaceIdentificationConfig
                .isCalculateSubstitutePlacesEnabled &&
            (maxRemainingDept > 0 ||
                !this._implicitPlaceIdentificationConfig.isMaxDeepnessEnabled)
        ) {
            let allNewSubstitutePlaces = implicitPlaces.flatMap(
                implicitResult => implicitResult.substitutePlaces
            );

            allNewSubstitutePlaces.forEach(substTemplatePlace => {
                if (
                    !this._alreadyImplicitPlaces.has(
                        substTemplatePlace.toUniqueString()
                    )
                ) {
                    const substPlace = substTemplatePlace.buildPlaceWithId(
                        'p' + counter++
                    );
                    petriNet.addPlace(substPlace);
                    substPlace.ingoingArcs.forEach(arc => petriNet.addArc(arc));
                    substPlace.outgoingArcs.forEach(arc =>
                        petriNet.addArc(arc)
                    );
                    counter =
                        this.internalRemoveImplicitPlacesForAndIncreaseCounter(
                            substPlace,
                            petriNet,
                            counter,
                            maxRemainingDept - 1
                        );
                }
            });
        }
        return counter;
    }

    private checkSubstitutePlacesAreValidOrEmpty(
        substitutePlaces: Array<TemplatePlace>
    ) {
        if (substitutePlaces.length === 0) {
            return true;
        }
        for (const substitutePlace of substitutePlaces) {
            for (const inTempArc of substitutePlace.unconnectedIngoingTemplateArcs) {
                if (inTempArc.weight > this.maxIngoingArcWeights) {
                    return false;
                }
            }
            for (const outTempArc of substitutePlace.unconnectedOutgoingTemplateArcs) {
                if (outTempArc.weight > this.maxOutgoingArcWeights) {
                    return false;
                }
            }
        }
        return true;
    }
}
