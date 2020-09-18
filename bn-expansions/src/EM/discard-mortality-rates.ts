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
import { Catches, Disposition, GearTypes } from '@boatnet/bn-models';
import { get, set } from 'lodash';

const jp = require('jsonpath');

// from IFQ Business Rules
const discardMortalityRatesMap = {
    SABL: {
        [GearTypes.MidwaterTrawl]: 1,
        [GearTypes.FishPot]: 20,
        [GearTypes.HookAndLine]: 20,
        [GearTypes.GroundfishTrawlFootropeLessThan8]: 50,
        [GearTypes.GroundfishTrawlGreaterThan8]: 50,
    },
    203: {
        [GearTypes.MidwaterTrawl]: 1,
        [GearTypes.FishPot]: 20,
        [GearTypes.HookAndLine]: 20,
        [GearTypes.GroundfishTrawlFootropeLessThan8]: 50,
        [GearTypes.GroundfishTrawlGreaterThan8]: 50,
    },
    LCOD: {
        [GearTypes.MidwaterTrawl]: 100,
        [GearTypes.FishPot]: 7,
        [GearTypes.HookAndLine]: 7,
        [GearTypes.GroundfishTrawlFootropeLessThan8]: 50,
        [GearTypes.GroundfishTrawlGreaterThan8]: 50
    },
    603: {
        [GearTypes.MidwaterTrawl]: 100,
        [GearTypes.FishPot]: 7,
        [GearTypes.HookAndLine]: 7,
        [GearTypes.GroundfishTrawlFootropeLessThan8]: 50,
        [GearTypes.GroundfishTrawlGreaterThan8]: 50
    },
    PHLB: {
        [GearTypes.MidwaterTrawl]: 100,
        [GearTypes.FishPot]: 18,
        [GearTypes.HookAndLine]: 18
    },
    101: {
        [GearTypes.MidwaterTrawl]: 100,
        [GearTypes.FishPot]: 18,
        [GearTypes.HookAndLine]: 18
    }
}

export class discardMortalityRates implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {
        const currCatch = params.currCatch ? params.currCatch : {};
        let hauls = get(currCatch, 'hauls', []);
        for (let i = 0; i < hauls.length; i++) {
            let catches = get(hauls[i], 'catch', []);
            const gearType = get(hauls[i], 'gearTypeCode');
            for (let j = 0; j < catches.length; j++) {
                const catchVal = get(currCatch, 'hauls[' + i + '].catch[' + j + ']');
                const disposition = catchVal.disposition;
                const speciesCode = catchVal.speciesCode;
                if (disposition === Disposition.DISCARDED) {
                    let weight = 0;
                    if ((speciesCode === 'PHLB' || speciesCode === 101) &&
                        (gearType === GearTypes.GroundfishTrawlFootropeLessThan8 || gearType === GearTypes.GroundfishTrawlGreaterThan8)) {
                        weight = timeOnDeck(catchVal.timeOnDeck);
                    } else {
                        const rate = get(discardMortalityRatesMap, speciesCode + '[' + gearType + ']', 1);
                        weight = catchVal.weight * rate;
                    }
                    set(currCatch, 'hauls[' + i + '].catch[' + j + '].weight', weight);
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