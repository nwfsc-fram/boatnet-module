import { BaseCatch, WeightMethodValue, Basket, WcgopExpansions } from '@boatnet/bn-models';

export function updateCatchWeight(weightMethod: number, catchVal: BaseCatch) {
    switch (weightMethod) {
        case WeightMethodValue.basketWeightDetermination: {
            return updateCatchWt(catchVal, getBasketWeightDetermination)
        }
        case WeightMethodValue.OTCRetained: {
            // TODO
        }
        case WeightMethodValue.other: {
            // TODO
        }
        case WeightMethodValue.vesselEstimatedRetainedOnly: {
            // TODO
        }
        case WeightMethodValue.extrapolation: {
            // TODO
        }
        case WeightMethodValue.pacificHalibutLengthWeightConveresion: {
            // TODO
        }
        case WeightMethodValue.visualExperience: {
            // TODO
        }
        case WeightMethodValue.visualSpatial: {
            // TODO
        }
        case WeightMethodValue.pacificHalibutLengthWeightExtrapolation: {
            // TODO
        }
        case WeightMethodValue.actualWeightWholeHaul: {
            return updateCatchWt(catchVal, {});
        }
        case WeightMethodValue.actualWeightSubsample: {
            return updateCatchWt(catchVal, sumBaskets);
        }
        default: {
            console.log('error: weight method not found')
        }
    }
}

function getBasketWeightDetermination(baskets: Basket[], exapansionData: WcgopExpansions) {
    const sumBasketWt = sumBaskets(baskets);
    const avgBasketWt = sumBasketWt / baskets.length;
    const fullBasketCount = exapansionData && exapansionData.fullBasketCount ? exapansionData.fullBasketCount : 0;
    const partialBasketWt = exapansionData && exapansionData.partialBasketWt ? exapansionData.partialBasketWt : 0;
    const result = fullBasketCount * avgBasketWt + partialBasketWt;
    return result;
}

function sumBaskets(baskets: Basket[]) {
    let sumBasketWt: number = 0;
    for (let basket of baskets) {
        let weight = basket.weight && basket.weight.value ? basket.weight.value : 0;
        if (typeof weight === 'string') {
            weight = Number(weight);
        } else {
            weight = weight;
        }
        sumBasketWt += weight;
    }
    return sumBasketWt;
}

function updateCatchWt(catchVal: BaseCatch, calBasketWt: any) {
    let catchWt: number = 0;
    for (let i = 0; i < catchVal.children.length; i++) {
        if (catchVal.children[i].baskets && calBasketWt) {
            if (typeof calBasketWt === 'function') {
                catchVal.children[i].weight.value = calBasketWt(catchVal.children[i].baskets, catchVal.expansionsData);
            }
        }
        if (catchVal.children[i].weight) {
            catchWt += Number(catchVal.children[i].weight.value);
        }
    }
    catchVal.weight.value = catchWt;
    return catchVal;
}