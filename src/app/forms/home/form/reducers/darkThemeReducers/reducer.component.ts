import { createReducer, on } from '@ngrx/store';
import { defineThemeAction } from './action.component';

export const theme = 'theme';
export const themeFeatureName = 'theme';

export interface ThemeState {
    isDark: boolean;
}

export const initialState: ThemeState = {
    isDark: false,
};

export const ThemeReducer = createReducer(
    initialState,
    on(defineThemeAction, (state, { isDark }) => {
        return { ...state, isDark: isDark };
    })
);
