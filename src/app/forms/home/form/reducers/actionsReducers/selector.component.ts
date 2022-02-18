import { createFeatureSelector, createSelector } from "@ngrx/store";
import { StylingState, ElementStyle } from "./reducer.component";

export const selectStyleFeature = createFeatureSelector<ElementStyle>('style')

export const selectById = createSelector(
    selectStyleFeature,
    (state: ElementStyle): number => state.id
);

export const selectByCurrentId = createSelector(
    selectStyleFeature,
    (state: ElementStyle): number => state.currentId
);

export const selectByElement = createSelector(
    selectStyleFeature,
    (state: ElementStyle): string => state.element
);

export const selectByStyle = createSelector(
    selectStyleFeature,
    (state: ElementStyle): StylingState => state.style
);