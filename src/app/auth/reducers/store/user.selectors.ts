import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserState } from "./user.reducers";

const selectErrorFeature = createFeatureSelector<UserState>('error')

export const selectError = createSelector(
    selectErrorFeature,
    (state: UserState): string => state.error
);