import { emExpansions } from '../base/em-rule-base';
import { FishTicketRow, Catches } from '../../../bn-models/src/models/trips-api/';
import { ResponseCatch } from '../../../bn-models/src/models/trips-api/';
import { flattenDeep, uniq, cloneDeep } from 'lodash';
import * as jp from 'jsonpath';

export class unsortedCatch implements emExpansions {
    rulesExpansion(tripCatch: Catches, fishTickets: FishTicketRow[]): Catches {

        tripCatch = cloneDeep(tripCatch);

        // get total catch weight from fish tickets
        let totalWeight = fishTickets.reduce((acc: number, val: any) => {
            return acc + val.LANDED_WEIGHT_LBS;
        }, 0)

        // get unique species from fish tickets
        const specieses = uniq(fishTickets.map( (row: any) => row.PACFIN_SPECIES_CODE));
        const speciesWeights = {};
        for (const species of specieses) {
            const speciesWeight = fishTickets.reduce((acc: number, val: any) => {
                if (val.PACFIN_SPECIES_CODE === species) { // need to convert wcgop code to PFSC for reviews
                    return acc + val.LANDED_WEIGHT_LBS
                } else {
                    return acc
                }
            }, 0)
            const percentOfTotal = speciesWeight / totalWeight;
            speciesWeights[species] = {speciesWeight, percentOfTotal}
        }

        for (const haul of tripCatch.hauls) {
            let haulUNSTLbs = 0;
            for (const row of haul.catch) {
                if (['UNST', 999].includes(row.speciesCode)) {
                    haulUNSTLbs += row.weight;
                    haul.catch.splice(haul.catch.indexOf(row), 1);
                }
            }

            for (const species of Object.keys(speciesWeights)) {
                haul.catch.push(
                    {
                        speciesCode: species,
                        weight: (haulUNSTLbs * speciesWeights[species].percentOfTotal),
                        calcWeightType: 'CalcField',
                        disposition: 'Discarded',
                        comments: "calculated by unsorted catch (net bleed) expansion"
                    }
                )
            }

        }

        console.log(tripCatch);
        return tripCatch;
    }
}