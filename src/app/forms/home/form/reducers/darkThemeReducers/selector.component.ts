import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ThemeState } from './reducer.component';

export const selectThemeFeature = createFeatureSelector<ThemeState>('theme');

export const selectByTheme = createSelector(
    selectThemeFeature,
    (state: ThemeState): boolean => state.isDark
);
