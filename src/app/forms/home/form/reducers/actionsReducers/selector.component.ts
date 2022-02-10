import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StylingState, ElementStyle } from "./reducer.component";

const selectElementStyleFeature = createFeatureSelector<ElementStyle>('style')


export const selectElementStyleId = createSelector(
    selectElementStyleFeature,
    (state: ElementStyle): number => state.id
);

export const selectCurrElementId = createSelector(
    selectElementStyleFeature,
    (state: ElementStyle): number => state.currId
);

export const selectElementStyleElem = createSelector(
    selectElementStyleFeature,
    (state: ElementStyle): string => state.elem
);

export const selectElementStyleStyle = createSelector(
    selectElementStyleFeature,
    (state: ElementStyle): StylingState => state.style
);