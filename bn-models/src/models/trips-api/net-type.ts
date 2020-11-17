import { BaseLookup } from '../_base/base-lookup';
export const NetTypeName = 'net-type';

export enum netTypeLookupValueEnum {
    bottomOrRollerTrawl = 'B',
    danishOrScottishSeine = 'D',
    selectiveFlatfishTrawl = 'F',
    largeFootropeTrawl = 'L',
    pelagicMidwaterTrawl = 'M',
    smallFootropeTrawl = 'S'
  }

export type NetType = BaseLookup;
    // description
    // lookupValue
    // isActive
    // isEm

    /*
        {
            type: "net-type",
            lookupValue: "M",
            description: "Pelagic (mid water) Trawl",
            isActive: true,
            isEm: true
        }
    */