import { ActionReducerMap } from '@ngrx/store';

import * as fromAuth from '../auth/store/auth.reducer';
import * as fromStocks from '../shared/widgets/store/widged.reducer';


export interface AppState {
    auth: fromAuth.State;
    stocks: fromStocks.State;
  }

  export const appReducer: ActionReducerMap<AppState> = {
    auth: fromAuth.authReducer as any,
    stocks: fromStocks.stockReducer as any
  };