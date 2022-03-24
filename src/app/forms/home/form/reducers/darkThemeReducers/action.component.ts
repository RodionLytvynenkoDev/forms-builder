import { createAction, props } from '@ngrx/store';

const defineTheme = '[STYLING] defineTheme';

export const defineThemeAction = createAction(
    defineTheme,
    props<{ isDark: boolean }>()
);
