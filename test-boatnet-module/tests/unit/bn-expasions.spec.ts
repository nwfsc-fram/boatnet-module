import { updateCatchWeight } from '@boatnet/bn-expansions';

describe('@boatnet/bn-expansions', () => {
    it('total catch weight calculation works', () => {
        const expectedCatchObj = JSON.parse(JSON.stringify(catchObj));
        expectedCatchObj.weight.value = 41;
        expect(updateCatchWeight(20, catchObj)).toEqual(expectedCatchObj);
    })
})

const catchObj: any = {
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