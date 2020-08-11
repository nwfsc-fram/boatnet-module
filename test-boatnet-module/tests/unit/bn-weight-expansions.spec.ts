import { updateCatchWeight } from '@boatnet/bn-expansions';
import { WeightMethodValue } from '@boatnet/bn-models';

// TODO pending re-write of expansions rules. Waiting for the catch
// data structure to be in place before writing any additional rules.
// Also wating on finalizatin of this rules engine architecture.
// For now just have a stub in place.


describe('@boatnet/bn-expansions', () => {
    it('basket weight determination calculation works', () => {
        true
    })
})

/*describe('@boatnet/bn-expansions', () => {
    it('basket weight determination calculation works', () => {
        const expectedCatchObj = JSON.parse(JSON.stringify(catchObj));
        expectedCatchObj.weight.value = 968;
        expectedCatchObj.children[0].weight.value = 947;
        expect(updateCatchWeight(WeightMethodValue.basketWeightDetermination, catchObj)).toEqual(expectedCatchObj);
    })
})

describe('@boatnet/bn-expansions', () => {
    it('actual weight whooe haul calculation works', () => {
        const expectedCatchObj = JSON.parse(JSON.stringify(catchObjWithoutBaskets));
        expectedCatchObj.weight.value = 41;
        expect(updateCatchWeight(WeightMethodValue.actualWeightWholeHaul, catchObjWithoutBaskets)).toEqual(expectedCatchObj);
    })
})

describe('@boatnet/bn-expansions', () => {
    it('actual weight subsample calculation works', () => {
        const expectedCatchObj = JSON.parse(JSON.stringify(catchObj));
        expectedCatchObj.weight.value = 208;
        expectedCatchObj.children[0].weight.value = 187;
        expect(updateCatchWeight(WeightMethodValue.actualWeightSubsample, catchObj)).toEqual(expectedCatchObj);   
    })
})*/

const catchObj: any = {
    expansionsData: {
        fullBasketCount: 10,
        partialBasketWt: 12
    },
    weight: {
        measurementType: 'weight',
        value: 100,
        units: 'lbs'
    },
    children: [
        {
            commonNames: [
                'Arrowtooth Flounder'
            ],
            weight: {
                measurementType: 'weight',
                value: 20,
                units: 'lbs'

            },
            baskets: [
                {
                    weight: {
                        measurementType: 'weight',
                        value: 88,
                        units: 'lbs'
        
                    }
                },
                {
                    weight: {
                        measurementType: 'weight',
                        value: 99,
                        units: 'lbs'
        
                    }
                }
            ]
        },
        {
            commonNames: [
                'Longnose Skate'
            ],
            weight: {
                measurementType: 'weight',
                value: 21,
                units: 'lbs'

            }
        },
        {
            commonNames: [
                'Crab'
            ]
        }
    ]
}

const catchObjWithoutBaskets: any = {
    expansionsData: {
        fullBasketCount: 10,
        partialBasketWt: 12
    },
    weight: {
        measurementType: 'weight',
        value: 100,
        units: 'lbs'
    },
    children: [
        {
            commonNames: [
                'Arrowtooth Flounder'
            ],
            weight: {
                measurementType: 'weight',
                value: 20,
                units: 'lbs'

            }
        },
        {
            commonNames: [
                'Longnose Skate'
            ],
            weight: {
                measurementType: 'weight',
                value: 21,
                units: 'lbs'

            }
        },
        {
            commonNames: [
                'Crab'
            ]
        }
    ]
}