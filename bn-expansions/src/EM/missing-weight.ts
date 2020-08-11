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

export function weightFromSpeciesTotal(count: number, totalWeight: number ): number {
    return totalWeight/count;
}

interface IWeightFromLength {
    [key: string]: {a: number, b:number}
}

export function weightFromLength(pacfinSpeciesCode: string, length: number, count?: number): string | number {
    const values: IWeightFromLength = {
        'PHLB': {a: 0.000009209, b: 3.24},
        'DOVR': {a: 0.000008952, b: 3.2494},
        'EGLS': {a: 0.000009216, b: 3.227938},
        'PTRL': {a: 0.000004299, b: 3.49},
        'ARTH': {a: 0.000009436, b: 3.2101},
        'PCOD': {a: 0.000022937, b: 2.9919},
        'SABL': {a: 0.000003927, b: 3.430072},
        'PWHT': {a: 0.000011394, b: 3.060471},
        'POP':  {a: 0.000019842, b: 3.133},
        'BCAC': {a: 0.000035715, b: 2.881},
        'WDOW': {a: 0.000036156, b: 2.942},
        'DBRK': {a: 0.000065036, b: 2.824},
        'CNRY': {a: 0.000111113, b: 2.664},
        'SNOS': {a: 0.000042990, b: 2.927},
        'YTRK': {a: 0.000079146, b: 2.745},
        'YEYE': {a: 0.000016314, b: 3.222},
        'CLPR': {a: 0.000016755, b: 3.12},
        'SSPN': {a: 0.000008598, b: 3.357},
        'LSPN': {a: 0.000016061, b: 3.16},
        'CWCD': {a: 0.000022267, b: 3.093},
        'LCOD': {a: 0.000006298, b: 3.30635},
        'THDS': {a: 0.000016061, b: 3.16}
    }
    if (values[pacfinSpeciesCode.toUpperCase()]) {
        const weight = Math.pow(length, values[pacfinSpeciesCode.toUpperCase()].b)
        * values[pacfinSpeciesCode.toUpperCase()].a;
        if (count) {
            return weight * count;
        } else {
            return weight;
        }
    } else {
        return 'species values unavailable.'
    }
}

