/*

Discard Mortality Rates

Sablefish and lingcod discards are prorated based on a fleet-specific discard mortality rate. Pacific
halibut discards are prorated based on the time the fish is on deck prior to discarding for bottom trawl
vessels, while pot vessels have a fleet-specific discard mortality rate.

Sablefish
    • Midwater trawl - 100% mortality (no pro-ration needed)
    • Pot - 20% mortality
    • Bottom trawl - 50% mortality

Lingcod
    • Midwater trawl - 100% mortality (no pro-ration needed)
    • Pot - 7% mortality
    • Bottom trawl - 50% mortality

Pacific halibut
    • Midwater trawl - 100% mortality (no pro-ration needed)
    • Pot - 18% mortality
    • Bottom trawl - calculated based on time on deck. See Appendix D for details

Note that all flat rate DMRs are applied regardless of the condition of the fish. That means that they are
applied even to fish which may be in parts or otherwise obviously dead.

*/
import { BaseExpansion, ExpansionParameters } from "../base/em-rule-base";
import { Catches, Disposition, gearTypeLookupValueEnum, netTypeLookupValueEnum } from '@boatnet/bn-models';
import { get, set, indexOf } from 'lodash';

const jp = require('jsonpath');

// from IFQ Business Rules
const discardMortalityRatesMap = {
    SABL: {
        [netTypeLookupValueEnum.pelagicMidwaterTrawl]: 1,
        [gearTypeLookupValueEnum.fishPot]: .2,
        [gearTypeLookupValueEnum.hookAndLine]: .2,
        [netTypeLookupValueEnum.smallFootropeTrawl]: .5,
        [netTypeLookupValueEnum.largeFootropeTrawl]: .5,
        [netTypeLookupValueEnum.selectiveFlatfishTrawl]: .5,
        [netTypeLookupValueEnum.bottomOrRollerTrawl]: .5
    },
    203: {
        [netTypeLookupValueEnum.pelagicMidwaterTrawl]: 1,
        [gearTypeLookupValueEnum.fishPot]: .2,
        [gearTypeLookupValueEnum.hookAndLine]: .2,
        [netTypeLookupValueEnum.smallFootropeTrawl]: .5,
        [netTypeLookupValueEnum.largeFootropeTrawl]: .5,
        [netTypeLookupValueEnum.selectiveFlatfishTrawl]: .5,
        [netTypeLookupValueEnum.bottomOrRollerTrawl]: .5
    },
    LCOD: {
        [netTypeLookupValueEnum.pelagicMidwaterTrawl]: 1,
        [gearTypeLookupValueEnum.fishPot]: .07,
        [gearTypeLookupValueEnum.hookAndLine]: .07,
        [netTypeLookupValueEnum.smallFootropeTrawl]: .5,
        [netTypeLookupValueEnum.largeFootropeTrawl]: .5,
        [netTypeLookupValueEnum.selectiveFlatfishTrawl]: .5,
        [netTypeLookupValueEnum.bottomOrRollerTrawl]: .5
    },
    603: {
        [netTypeLookupValueEnum.pelagicMidwaterTrawl]: 1,
        [gearTypeLookupValueEnum.fishPot]: .07,
        [gearTypeLookupValueEnum.hookAndLine]: .07,
        [netTypeLookupValueEnum.smallFootropeTrawl]: .5,
        [netTypeLookupValueEnum.largeFootropeTrawl]: .5,
        [netTypeLookupValueEnum.selectiveFlatfishTrawl]: .5,
        [netTypeLookupValueEnum.bottomOrRollerTrawl]: .5
    },
    PHLB: {
        [netTypeLookupValueEnum.pelagicMidwaterTrawl]: 1,
        [gearTypeLookupValueEnum.fishPot]: .18,
        [gearTypeLookupValueEnum.hookAndLine]: .18
    },
    101: {
        [netTypeLookupValueEnum.pelagicMidwaterTrawl]: 1,
        [gearTypeLookupValueEnum.fishPot]: .18,
        [gearTypeLookupValueEnum.hookAndLine]: .18
    }
}

export class discardMortalityRates implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {
        const currCatch = params.currCatch ? params.currCatch : {};
        const speciesCodeLookup = params.speciesCodeLookup ? params.speciesCodeLookup : {};
        const bottomTrawlTypes = [
            netTypeLookupValueEnum.bottomOrRollerTrawl,
            netTypeLookupValueEnum.selectiveFlatfishTrawl,
            netTypeLookupValueEnum.largeFootropeTrawl,
            netTypeLookupValueEnum.smallFootropeTrawl
        ];
        let hauls = get(currCatch, 'hauls', []);
        for (let i = 0; i < hauls.length; i++) {
            let catches = get(hauls[i], 'catch', []);
            const gearType = get(hauls[i], 'gear');
            const netType = get(hauls[i], 'netType');
            for (let j = 0; j < catches.length; j++) {
                const catchVal = get(currCatch, 'hauls[' + i + '].catch[' + j + ']');
                const disposition = catchVal.disposition;
                const speciesCode = catchVal.speciesCode;
                if (disposition === Disposition.DISCARDED) {
                    let speciesWeight = 0;
                    if ((speciesCode === 'PHLB' || speciesCode === '101') && (indexOf(bottomTrawlTypes, netType) != -1)) {
                        speciesWeight = timeOnDeck(catchVal.timeOnDeck);
                    } else {
                        const lookupName = gearType ? gearType : netType;
                        const rate = get(discardMortalityRatesMap, speciesCode + '[' + lookupName + ']', 1);
                        speciesWeight = catchVal.speciesWeight * rate;
                        // expand count if priority or protected species
                        if ((speciesCodeLookup[speciesCode].isWcgopEmPriority || speciesCodeLookup[speciesCode].isProtected) && catchVal.speciesCount) {
                            let count = catchVal.speciesCount * rate;
                            set(currCatch, 'hauls[' + i + '].catch[' + j + '].speciesCount', count);
                        }
                    }
                    set(currCatch, 'hauls[' + i + '].catch[' + j + '].speciesWeight', speciesWeight);
                    set(currCatch, 'hauls[' + i + '].catch[' + j + '].comments', 'Weight from dmw expansion');
                    set(currCatch, 'hauls[' + i + '].catch[' + j + '].calcWeightType', 'Calculated Field');
                }
            }
        }
        return currCatch;
    }
}

function timeOnDeck(time: number) {
    const AE = 1.78186;
    const AP = 2.44045;
    const BE = -1.11352;
    const BP = -1.00494;
    const excellent = Math.exp(AE + BE * Math.log(time)) / (1 + Math.exp(AE + BE * Math.log(time)));
    const poor = Math.exp(AP + BP * Math.log(time)) / (1 + Math.exp(AE + BP * Math.log(time))) - excellent;
    const dead = 1 - (excellent + poor);
    return excellent * .2 + poor * .55 + dead * .9;
}