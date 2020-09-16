import { BaseExpansion, ExpansionParameters } from '../base/em-rule-base';
import { Catches, FishTicketRow } from '@boatnet/bn-models';
import { flattenDeep, uniq, cloneDeep } from 'lodash';
const jp = require('jsonpath');

export class missingWeight implements BaseExpansion {
    expand(params: ExpansionParameters): Catches {

        const equationValues: any = {
            'PHLB': {alpha: 0.000009209, beta: 3.24, citation: 'IPHC'},
            'DOVR': {alpha: 0.000008952, beta: 3.2494, citation: 'Sampson DB, Wood C (2001) Stock Status of Dover Sole off the US West Coast in 2000. Report from Hatfield Marine Science Center, Oregon State University, Newport, OR.'},
            'EGLS': {alpha: 0.000009216, beta: 3.227938, citation: 'Weinberg KL, Wilkins ME, Shaw FR, Zimmerman M (2002) The 2001 Pacific West Coast Bottom Trawl Survey of Groundfish Resources: Estimates of Distribution, Abundance, and Length and Age Composition. NOAA Tech. Memor. NMFS-AFSC-128.'},
            'PTRL': {alpha: 0.000004299, beta: 3.49, citation: 'Turnock J, Wilkins M, Saelens M, Wood C (1993) Status of West Coast Petrale Sole in 1993. Report from Alaska Fisheries Science Center, Seattle, WA and Oregon Department of Fish and Wildlife, Newport, OR.'},
            'ARTH': {alpha: 0.000009436, beta: 3.2101, citation: 'Rickey MH (1993) Status of the Coastal Arrowtooth Flounder Resource in 1993. Report from Washington Department of Fisheries, Olympia, WA.'},
            'PCOD': {alpha: 0.000022937, beta: 2.9919, citation: 'Karp WA, Miller BS (1977) Pacific Cod (Gadus macrocephalus) Studies in Port Townsend Bay, Washington. Report from the Fisheries Research Institute, University of Washington to the US Navy.'},
            'SABL': {alpha: 0.000003927, beta: 3.430072, citation: 'Parks NB, Shaw FR (1994) Relative abundance and size composition of sablefish (Anoplopoma fimbria) in the coastal waters of California and Southern Oregon, 1984-1991. NOAA Tech. Memo. NMFS-AFSC-35. 38p'},
            'PWHT': {alpha: 0.000011394, beta: 3.060471, citation: 'Weinberg KL, Wilkins ME, Shaw FR, Zimmerman M (2002) The 2001 Pacific West Coast Bottom Trawl Survey of Groundfish Resources: Estimates of Distribution, Abundance, and Length and Age Composition. NOAA Tech. Memor. NMFS-AFSC-128.'},
            'POP': {alpha: 0.000019842, beta: 3.133, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'BCAC': {alpha: 0.000035715, beta: 2.881, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'WDOW': {alpha: 0.000036156, beta: 2.942, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'DBRK': {alpha: 0.000065036, beta: 2.824, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'CNRY': {alpha: 0.000111113, beta: 2.664, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'SNOS': {alpha: 0.000042990, beta: 2.927, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'YTRK': {alpha: 0.000079146, beta: 2.745, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'YEYE': {alpha: 0.000016314, beta: 3.222, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'CLPR': {alpha: 0.000016755, beta: 3.12, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'SSPN': {alpha: 0.000008598, beta: 3.357, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'LSPN': {alpha: 0.000016061, beta: 3.16, citation: 'Haigh R, Olsen N, Starr P (2005) A Review of Longspine Thornyhead (Sebastolobus altivelis) along the Pacific Coast of Canada: biology, Distribution, and Abundance Trends. Research Document 2005/097 Fisheries and Oceans Canada.'},
            'CWCD': {alpha: 0.000022267, beta: 3.093, citation: 'Love M, Yoklavich M, Thorsteinson L (2002) The Rockfishes of the Northeast Pacific. University of California Press.'},
            'LCOD': {alpha: 0.000006298, beta: 3.30635, citation: 'Jagielo TH (1994) Assessment of Lingcod (Ophiodon elongatus) in the area north of 45° 46\' N (Cape Falcon) and South of 49° 00\' N in 1994. Report from Washington Department of Fish and Wildlife, Olympia, WA.'},
            'THDS': {alpha: 0.000016061, beta: 3.16, citation: 'Haigh R, Olsen N, Starr P (2005) A Review of Longspine Thornyhead (Sebastolobus altivelis) along the Pacific Coast of Canada: biology, Distribution, and Abundance Trends. Research Document 2005/097 Fisheries and Oceans Canada.'}
        }

        const wcgopCodeLookup: any = {
            334: "ARRA", 141: "ARTH", 337: "BANK", 302: "BCAC", 306: "BLCK", 319: "BLGL", 316: "BLUR", 119: "BMOL", 356: "BRNZ", 109: "BSOL", 124: "CHLB", 222: "CHNK", 221: "CHUM", 325: "CLPR", 358: "CMEL", 314: "CNRY", 223: "COHO", 117: "CSOL", 118: "CTRB", 360: "CWCD", 311: "DBRK", 12: "DCRB", 107: "DOVR", 110: "DSOL", 361: "DWRF", 108: "EGLS", 601: "EULC", 362: "FLAG", 120: "FNTS", 363: "FRCK", 103: "FSOL", 366: "GBLC", 339: "GSPT", 313: "GSRK", 231: "GSTG", 102: "GTRB", 367: "HBRK", 323: "HLQN", 368: "HNYC", 122: "HTRB", 603: "LCOD", 125: "LDAB", 352: "LSPN", 899: "MISC", 777: "MISC", 974: "MISC", 860: "MSC2", 370: "MXRF", 303: "NRCK", 3002: "NUSF", 3003: "NUSP", 3001: "NUSR", 116: "OFLT", 5000: "OFLT", 123: "OFLT", 371: "OLVE", 202: "PCOD", 137: "PDAB", 335: "PGMY", 101: "PHLB", 225: "PINK", 201: "PLCK", 372: "PNKR", 301: "POP", 373: "PRRK", 112: "PTRL", 374: "PUGT", 206: "PWHT", 308: "RDBD", 324: "REDS", 105: "REX", 307: "REYE", 312: "ROSY", 104: "RSOL", 309: "RSTN", 203: "SABL", 318: "SBLY", 304: "SHRP", 310: "SLGR", 111: "SLNS", 315: "SNOS", 224: "SOCK", 376: "SPKL", 377: "SQRS", 326: "SRKR", 126: "SSDB", 115: "SSOL", 350: "SSPN", 378: "STAR", 328: "STRK", 142: "STRY", 379: "SWSP", 209: "TCOD", 349: "THDS", 329: "TIGR", 136: "UDAB", 100: "UFLT", 300: "URCK", 375: "URCK", 200: "URND", 220: "USMN", 230: "USTG", 331: "VRML", 305: "WDOW", 322: "YEYE", 320: "YMTH", 321: "YTRK",
        }

        const getTotalWeight = (speciesAverageWeight: any, missingWeightCatch: any) => {
            if (typeof speciesAverageWeight === "string") {
                return speciesAverageWeight;
            } else {
                if (missingWeightCatch.speciesCount) {
                    return speciesAverageWeight * parseInt(missingWeightCatch.speciesCount, 10);
                } else {
                    return speciesAverageWeight;
                }
            }
        }

        const tripCatch = params.currCatch ? cloneDeep(params.currCatch) : {};
        const fishTickets = params.fishTickets ? params.fishTickets : [];
        const logbook = params.logbook ? params.logbook : {};

        // is tripCatch a logbook?
        const isLogbook: boolean = tripCatch.source === 'logbook';

        // get total retained weight per species from fishTickets

        // get unique species from fish tickets
        const ftSpecies = uniq(fishTickets.map( (row: any) => row.PACFIN_SPECIES_CODE));
        // get sum of weight per species
        const ftSpeciesWeights: any = {};
        for (const species of ftSpecies) {
            const speciesWeight = fishTickets.reduce((acc: number, val: any) => {
                if (val.PACFIN_SPECIES_CODE === species && val.CONDITION_CODE === 'R') {
                    return acc + val.LANDED_WEIGHT_LBS
                } else {
                    return acc
                }
            }, 0);
            ftSpeciesWeights[species] = speciesWeight
        }

        // get total retained count and weight per species from logbook
        let flattenedLbCatch: any[] = jp.query(logbook, '$..catch');
        flattenedLbCatch = flattenDeep(flattenedLbCatch);
        const lbSpecies = uniq(flattenedLbCatch.map( (row: any) => row.speciesCode));
        const lbRetainedSpeciesCountsWeights: any = {};
        for ( const species of lbSpecies) {
            const speciesCount = flattenedLbCatch.reduce( (acc: number, val: any) => {
                if (val.speciesCode === species && val.disposition === 'Retained' && val.speciesCount) {
                    return acc + parseInt(val.speciesCount, 10);
                } else {
                    return acc;
                }
            }, 0)
            const speciesWeight = flattenedLbCatch.reduce( (acc: number, val: any) => {
                if (val.speciesCode === species && val.disposition === 'Retained' && val.weight) {
                    return acc + parseFloat(val.weight);
                } else {
                    return acc;
                }
            }, 0)
            lbRetainedSpeciesCountsWeights[species] = {count: speciesCount, weight: speciesWeight};
        }

        for (const haul of tripCatch.hauls!) {
            if (haul.catch) {
                for (let i = haul.catch!.length - 1; i >= 0; i--) {
                    if ((haul.catch[i].speciesCount || haul.catch[i].length) && !haul.catch[i].weight) {  // catch has a count and/or length, but no weight
                        const missingWeightCatch: any = cloneDeep(haul.catch[i]);
                        const speciesCode = isLogbook ? haul.catch[i].speciesCode : wcgopCodeLookup[parseInt(haul.catch[i].speciesCode!)];
                        const haveSpeciesFtRetainedWeight: boolean = ftSpeciesWeights[speciesCode] ? true : false;
                        const haveSpeciesLogbookRetainedCount: boolean = lbRetainedSpeciesCountsWeights[speciesCode] && lbRetainedSpeciesCountsWeights[speciesCode].count ? true : false
                        const haveSpeciesLogbookRetainedWeight: boolean = lbRetainedSpeciesCountsWeights[speciesCode] && lbRetainedSpeciesCountsWeights[speciesCode].weight ? true : false

                        let speciesAverageWeight = null;
                        switch(true) {
                            case(haveSpeciesFtRetainedWeight && haveSpeciesLogbookRetainedCount):
                                speciesAverageWeight = ftSpeciesWeights[speciesCode] / lbRetainedSpeciesCountsWeights[speciesCode].count;
                                break;
                            case(haveSpeciesLogbookRetainedCount && haveSpeciesLogbookRetainedWeight):
                                speciesAverageWeight = lbRetainedSpeciesCountsWeights[speciesCode].weight / lbRetainedSpeciesCountsWeights[speciesCode].count;
                                break;
                            case(missingWeightCatch.length && missingWeightCatch.length !== ''): // have a length
                                if (equationValues[speciesCode]) {
                                    speciesAverageWeight = equationValues[speciesCode].alpha * Math.pow(missingWeightCatch.length, equationValues[speciesCode].beta);
                                } else {
                                    console.log("missing equation values for species");
                                    speciesAverageWeight = "missing equation values for species: " + speciesCode;
                                }
                                break;
                            case(missingWeightCatch.speciesCount && !missingWeightCatch.length): // count but no length
                                console.log("currently unable to handle a count with no length without retained fish ticket or logbook data");
                                speciesAverageWeight = "currently unable to handle a count with no length without retained fish ticket or logbook data";
                                break;
                            default:
                                console.log("this should not be possible");
                                speciesAverageWeight = "this should not be possible";
                                break;
                        }
                        const speciesTotalWeight = getTotalWeight(speciesAverageWeight, missingWeightCatch);
                        missingWeightCatch.weight = speciesTotalWeight;
                        missingWeightCatch.calcWeightType = "from length";
                        missingWeightCatch.comments = "calculated by missing weights expansion";
                        haul.catch.splice(i, 1, missingWeightCatch);
                    }
                }
            }
        }
        return tripCatch
    }
}
/*
Missing Weights

In the pot boat fleet, EM reviewers provide counts and lengths rather than the weight of most IFQ
discards. In all fisheries, occasionally no weight or length data is available for a fish recorded either in
EM or in a logbook. In EM this occurs most often when the fish is discarded unintentionally before
length or weight can be estimated, or when the fish is in too poor condition to estimate weight or
length.

When only a count is provided, the weight is estimated preferentially in the following order:
1) The average weight of fish of that species calculated using the retained counts from the logbook
and the total weight retained from Etix.
2) The average weight of fish of that species calculated using the retained counts from the logbook
and the retained weight from the logbook.
3) The average weight of fish of that species calculated using the discard count and discard weight
from the logbook.
4) Using the length and a length weight equation. See Appendix A for additional details.

        pseudocode:
        1 - if pacfinSpeciesCode is retained on logbook, try to get the total count of retained fish of \
        species from logbook and total weight of retained of species from fish tickets.  if both are \
        available, run the calc.  if retained count is unavailable, skip to 3.  if species weight total \
        from fish tickets is unavailable, skip to 2.

        2. with the species retained count from logbook in hand, try to get the retained weight for the \
        species from the logbook.  if the both are available, run the calc.  if retained weight is \
        unavailable, try method 3.

        3. look for discard count and discard weight for the species on the logbook.  if both are available,\
        run the calc.  if either is missing, skip to method 4.

        4.  run weight from length calc on length.

Note that originally the length-weight equation was used preferentially, however we found that the
weights derived from the length-weight equation for sablefish (the vast majority of calculated weights
are for sablefish discards from pot boats) were consistently leading to higher weights than those
recorded by fishermen in their logbooks. While this could be attributed to misreporting (intentional or
not), we found that the same vessels were able to accurately estimate their retained weight (i.e. the
total retained weight on the logbook was similar to the retained weight on their fish ticket). Since the
length-weight equation appeared to produce a bias, we moved it to a lower order of preference,
however this might be revisited at a future date.

Appendix A: Length-Weight Equations

Data:
In the pot boat fleet, EM reviewers estimate the length rather than the weight of most IFQ discards. The
length is estimated when the crew holds the fish against a Marley board in front of the camera.

Approach:
For IFQ species, a length-weight equation found in the scientific literature is sometimes used to
calculate the weight of a fish based on its length.

Small thornyheads often cannot be determined to species. Because the length-weight equations of
shortspine and longspine are very close, and because weights are rounded to the nearest pound, using
either equation generally results in the same weight estimate. We expect that a higher percentage of
these are longspine thornyheads, due to their size and reviewing past logbooks, therefore we use the
longspine thornyhead equation to estimate the weight of unidentified thornyheads.

Specific equations and data sources:
Length weight equations used in the database all take the form: Wlbs = αLcmβ

The table below shows values of alpha and beta for each equation as well as the source of the equation.

Common Name α β Citation
Pacific Halibut 0.000009209 3.24 1
Dover Sole 0.000008952 3.2494 2
English Sole 0.000009216 3.227938 3
Petrale Sole 0.000004299 3.49 4
Arrowtooth Flounder 0.000009436 3.2101 5
Pacific Cod 0.000022937 2.9919 6
Sablefish 0.000003927 3.430072 7
Pacific Hake 0.000011394 3.060471 3
Pacific Ocean Perch 0.000019842 3.133 8
Bocaccio Rockfish 0.000035715 2.881 8
Widow Rockfish 0.000036156 2.942 8
Darkblotched Rockfish 0.000065036 2.824 8
Canary Rockfish 0.000111113 2.664 8
Splitnose Rockfish 0.000042990 2.927 8
Yellowtail Rockfish 0.000079146 2.745 8
Yelloweye Rockfish 0.000016314 3.222 8
Chilipepper Rockfish 0.000016755 3.12 8
Shortspine Thornyhead 0.000008598 3.357 8
Longspine Thornyhead 0.000016061 3.16 9
Cowcod Rockfish 0.000022267 3.093 8
Lingcod 0.000006298 3.30635 10
Shortspine/Longspine Thornyheads 0.000016061 3.16 9

*/

// export function weightFromSpeciesTotal(count: number, totalWeight: number ): number {
//     return totalWeight/count;
// }

// interface IWeightFromLength {
//     [key: string]: {a: number, b:number}
// }

// export function weightFromLength(pacfinSpeciesCode: string, length: number, count?: number): string | number {
//     const values: IWeightFromLength = {
//         'PHLB': {a: 0.000009209, b: 3.24},
//         'DOVR': {a: 0.000008952, b: 3.2494},
//         'EGLS': {a: 0.000009216, b: 3.227938},
//         'PTRL': {a: 0.000004299, b: 3.49},
//         'ARTH': {a: 0.000009436, b: 3.2101},
//         'PCOD': {a: 0.000022937, b: 2.9919},
//         'SABL': {a: 0.000003927, b: 3.430072},
//         'PWHT': {a: 0.000011394, b: 3.060471},
//         'POP':  {a: 0.000019842, b: 3.133},
//         'BCAC': {a: 0.000035715, b: 2.881},
//         'WDOW': {a: 0.000036156, b: 2.942},
//         'DBRK': {a: 0.000065036, b: 2.824},
//         'CNRY': {a: 0.000111113, b: 2.664},
//         'SNOS': {a: 0.000042990, b: 2.927},
//         'YTRK': {a: 0.000079146, b: 2.745},
//         'YEYE': {a: 0.000016314, b: 3.222},
//         'CLPR': {a: 0.000016755, b: 3.12},
//         'SSPN': {a: 0.000008598, b: 3.357},
//         'LSPN': {a: 0.000016061, b: 3.16},
//         'CWCD': {a: 0.000022267, b: 3.093},
//         'LCOD': {a: 0.000006298, b: 3.30635},
//         'THDS': {a: 0.000016061, b: 3.16}
//     }
//     if (values[pacfinSpeciesCode.toUpperCase()]) {
//         const weight = Math.pow(length, values[pacfinSpeciesCode.toUpperCase()].b)
//         * values[pacfinSpeciesCode.toUpperCase()].a;
//         if (count) {
//             return weight * count;
//         } else {
//             return weight;
//         }
//     } else {
//         return 'species values unavailable.'
//     }
// }

