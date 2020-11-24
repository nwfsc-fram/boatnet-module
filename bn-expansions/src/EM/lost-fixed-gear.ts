import { BaseExpansion, ExpansionParameters } from '../base/em-rule-base';
import { Catches, Disposition } from '@boatnet/bn-models';
import { uniq, cloneDeep } from 'lodash';

export class lostFixedGear implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {

        const tripCatch: any = params.currCatch ? cloneDeep(params.currCatch) : {};

        // for each haul - if gearLost > 0
        for (const haul of tripCatch.hauls) {
            if (haul.gearLost && parseInt(haul.gearLost) > 0 && parseInt(haul.gearLost) < parseInt(haul.gearPerSet) && haul.catch && haul.catch.length > 0) {
                // for each species in the haul
                const speciesList: string[] = uniq(haul.catch.map( (row: any) => row.speciesCode));
                const speciesWeights: any = {};
                const speciesCounts: any = {};
                for (const species of speciesList) {
                    // sum the discarded and retained
                    const totalSpeciesWeight = haul.catch.reduce( (acc: number, val: any) => {
                        if (val.speciesCode === species) {
                            return acc + val.speciesWeight;
                        } else {
                            return acc
                        }
                    }, 0);
                    // divide by the gearPerSet to get average LBS per gear (pot or hook)
                    speciesWeights[species] = totalSpeciesWeight / (haul.gearPerSet - parseInt(haul.gearLost));
                    const totalCount = haul.catch.reduce((acc: number, val: any) => {
                        if (val.speciesCode === species && val.speciesCount) {
                            return acc + val.speciesCount;
                        } else {
                            return acc;
                        }
                    }, 0);
                    // divide by the gearPerSet to get average count per gear (pot or hook)
                    speciesCounts[species] = totalCount / (haul.gearPerSet - parseInt(haul.gearLost));
                }
                for (const speciesCode of Object.keys(speciesWeights)) {
                    // add a catch item with weight of (average LBS * gearLost) + calcWeightType of 'From Average Weight'
                    haul.catch.push({
                        disposition: Disposition.DISCARDED,
                        speciesCode,
                        speciesWeight: speciesWeights[speciesCode] * parseInt(haul.gearLost),
                        speciesCount: speciesCounts[speciesCode] ? speciesCounts[speciesCode] * parseInt(haul.gearLost) : 0,
                        calcWeightType: 'From Average Weight',
                        comments: 'Added by lost fixed gear expansion'
                    })
                }
            } else if (
                (haul.gearLost && parseInt(haul.gearLost) > 0)
                && ( haul.gearPerSet && parseInt(haul.gearLost) >= parseInt(haul.gearPerSet)
                     || !haul.catch
                     || haul.catch.length === 0
                   )
            ) {
                console.log('lost haul/set/string identified');
                haul.catch = [
                    {
                        comments: 'Lost haul/string/set identified - must be handled manually for now.'
                    }
                ];

            }
        }
        return tripCatch
    }

}

/*

Appendix B: Lost Gear

Lost pots
When a pot is lost, the discard is calculated as the average weight of catch (both discarded and retained)
from all other pots in the string. This calculation is automated.

(section below just for reference for now)
Calculations for lost nets or lost strings of pots are done manually, and then applied to the vessel account
(written to the CalculatedTripDiscards table in the CatchReporting database).

Lost Strings of Pots
For lost strings of pots, the average catch per pot for the rest of the trip
is calculated and then multiplied by the number of lost pots:

(Σ Discards + Σ Retained) / (nTotal Pots – nLost Pots) * nLost Pots
where the discards are taken from the EM review
and the retained catch is taken from the fish ticket.

There might be cases where it would be appropriate not to use the entirety of the trip to calculate
the average catch per pot. For example, if a boat fished in two disparate areas or had different
target species. This is not common for pot boats, so generally the catch from the whole trip is used.
This decision is made on a case by case basis.

*/
