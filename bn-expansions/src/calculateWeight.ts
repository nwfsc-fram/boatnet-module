import { BaseCatch } from '@boatnet/bn-models';

export function updateCatchWeight(weightMethod: number, catchVal: BaseCatch) {
    if (weightMethod === 3) {
        // TODO
    } else if (weightMethod === 5) {
        // TODO
    } else if (weightMethod === 6) {
        // TODO
    } else if (weightMethod === 7) {
        // TODO
    } else if (weightMethod === 8) {
        // TODO
    } else if (weightMethod === 9) {
        // TODO
    } else if (weightMethod === 14) {
        // TODO
    } else if (weightMethod === 15) {
        // TODO
    } else if (weightMethod === 19) {
        // TODO
    } else if (weightMethod === 20) {
        return getWholeWeight(catchVal);
    } else if (weightMethod === 21) {
        // TODO
    }
}

// updates baskets and species weights
function getWholeWeight(catchVal: BaseCatch) {
    let catchWt: number = 0;
    for (let i = 0; i < catchVal.children.length; i++) {
        if (catchVal.children[i].baskets) {
            let basketWt: number = 0;
            for (let j = 0; j < catchVal.children[i].baskets.length; j++) {
                let weight = catchVal.children[i].baskets[j].weight.value;
                if (typeof weight === 'string') {
                    weight = Number(weight);
                } else {
                    weight = weight;
                }
                basketWt += weight;
                catchVal.children[i].baskets[j].avgWt = weight / catchVal.children[i].baskets[j].count;
            }
            catchVal.children[i].weight.value = basketWt;
        }
        if (catchVal.children[i].weight) {
          catchWt += Number(catchVal.children[i].weight.value);
        }
    }
    catchVal.weight.value = catchWt;
    return catchVal;
}