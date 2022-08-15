import { Action } from '@ngrx/store';

import { PieData, Stock } from "src/app/modules/dashboard.service";



export const SET_STOCKS = '[Stocks] SET STOCKS]'
export const SET_PIEDATA = '[Stocks] SET PIE DATA'
export const FETCH_STOCKS = '[Stocks] FETCH_STOKCS'

export class SetStocks implements Action {
    readonly type = SET_STOCKS;

    constructor(public payload: Stock[] ){}
}

export class FetchStocks implements Action {
    readonly type = FETCH_STOCKS;
}

export class SetPieData implements Action {
    readonly type = SET_PIEDATA;

    constructor(public payload: PieData[]){}
}

export type StocksActions = 
| SetStocks 
| SetPieData 
| FetchStocks;