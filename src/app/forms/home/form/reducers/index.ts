import {
  ActionReducerMap,
  MetaReducer
} from '@ngrx/store';
import {ElementStyle, ElementStyleReducer, ElementStyles} from './stylingReducers/reducer.component'
import { environment } from '../../../../../environments/environment';

export interface State {
  [ElementStyles]: ElementStyle
  
}

export const reducers: ActionReducerMap<State> = {
  [ElementStyles]: ElementStyleReducer
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];