import { BaseLookup } from '../_base/base-lookup';
export const GearTypeName = 'gear';

export enum gearTypeLookupValueEnum {
    trawl = 'trawl',
    hookAndLine = 'hook & line',
    fishPot = 'fish pot',
    longline = 'longline (snap)'
  }

export type Gear = BaseLookup;
    // description
    // lookupValue
    // isActive
    // isEm

    /*
        {
            type: "gear",
            lookupValue: "Trawl",
            description: "Trawl",
            isActive: true,
            isEm: true
        }

    */