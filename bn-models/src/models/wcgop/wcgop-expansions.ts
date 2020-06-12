export type WcgopExpansions = BasketWtDetermination 
    | Extrapolations 
    | VisualSpatial 
    | PacificHalibulLengthWidthExtrapolation;

// WM 3
interface BasketWtDetermination {
    fullBasketCount?: number;
    partialBasketWt?: number;
}

// WM 8
interface Extrapolations {
    indivSpeciesCount?: number;
}

// WM 15
interface VisualSpatial {
    totalSection?: number;
    sectionsSample?: number;
}

// WM 19
interface PacificHalibulLengthWidthExtrapolation {
    totalPHLB?: number;
}