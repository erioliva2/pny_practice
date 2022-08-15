import { Stock } from '../../../modules/dashboard.service';
import * as StocksActions from './widget.actions';

export interface State {
    stocks: Stock[];
}

const initialState: State = {
    stocks: []
}

export function stockReducer( state = initialState, action: StocksActions.StocksActions) {

    switch(action.type){
        case StocksActions.SET_STOCKS:
        return {
            ...state,
            stocks: [...action.payload]
        }
        case StocksActions.SET_PIEDATA:
            return{
                ...state,
                stocks: [...action.payload]
            }
    };

    return state;
}