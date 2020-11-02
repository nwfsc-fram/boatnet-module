import { BaseExpansion, ExpansionParameters } from '../base/em-rule-base';
import { Catches } from '@boatnet/bn-models';
import { uniq, cloneDeep } from 'lodash';

export class unsortedCatch implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {
        const tripCatch = params.currCatch ? cloneDeep(params.currCatch) : {};
        const fishTickets = params.fishTickets ? params.fishTickets : [];

        // get total catch weight from fish tickets
        let totalWeight = fishTickets.reduce((acc: number, val: any) => {
            return acc + val.LANDED_WEIGHT_LBS;
        }, 0)

        // get unique species from fish tickets
        const specieses = uniq(fishTickets.map( (row: any) => row.PACFIN_SPECIES_CODE));
        const speciesWeights: any = {};
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

        for (const haul of tripCatch.hauls!) {
            if (haul.catch) {
                let haulUNSTLbs = 0;
                for (let i = haul.catch.length - 1; i >= 0; i--) {
                    if (haul.catch[i].speciesCode && ['UNST', '999'].includes(haul.catch[i].speciesCode!.toString())) {
                        if (haul.catch[i].speciesWeight) {
                            haulUNSTLbs += haul.catch[i].speciesWeight!;
                        }
                        haul.catch.splice(i, 1);
                    }
                }

                if (haulUNSTLbs > 0) {
                    for (const species of Object.keys(speciesWeights)) {
                        const disposition: any = 'Discarded'
                        haul.catch.push(
                            {
                                speciesCode: species,
                                speciesWeight: (haulUNSTLbs * speciesWeights[species].percentOfTotal),
                                calcWeightType: 'CalcField',
                                disposition,
                                comments: "calculated by unsorted catch (net bleed) expansion"
                            }
                        )
                    }
                }
            }
        }
        return tripCatch;
    }
}