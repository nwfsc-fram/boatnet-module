export type WcgopExpansions = BasketWtDetermination
    & VisualSpatial;

// WM 3
interface BasketWtDetermination {
    fullBasketCount?: number;
}

// WM 15
interface VisualSpatial {
    totalSection?: number;
    sectionsSample?: number;
}