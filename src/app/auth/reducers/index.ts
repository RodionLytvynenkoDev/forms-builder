import {
    ActionReducerMap,
    MetaReducer
} from '@ngrx/store';
  import {UserState, UserReducer, ElementStyles} from './../reducers/store/user.reducers'
  import { environment } from '../../../environments/environment';
  
  export interface State {
    [ElementStyles]: UserState
    
  }
  
  export const reducers: ActionReducerMap<State> = {
    [ElementStyles]: UserReducer
  };
  
  
  export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];