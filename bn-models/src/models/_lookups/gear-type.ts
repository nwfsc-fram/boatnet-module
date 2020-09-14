import { BaseLookup } from "../_base";

// from lookups
export const GearType = 'gear-type';

export enum GearTypes {
    GroundfishTrawlFootropeLessThan8 = "1",
    GroundfishTrawlGreaterThan8 = "2",
    MidwaterTrawl = "3",
    DanishScottishSeine = "4",
    OtherTrawlGear = "5",
    Longline = "6",
    VerticalHookAndLineGear = "7",
    Pole = "8",
    OtherHookAndLineGear = "9",
    FishPot = "10",
    PrawnTrawl = "11",
    ShrimpTrawlSingleRigged = "12",
    SprimpTrawlDoubleRigged = "13",
    AllNetGearExceptTrawl = "14",
    AllTrollGear = "15",
    AllOtherMiscGear = "16",
    OregeonSetBackFlatfishNet = "17",
    PrawnTrap = "18",
    HookAndLine = "19",
    LonglineSnap = "20"
}

export type GearType = BaseLookup;