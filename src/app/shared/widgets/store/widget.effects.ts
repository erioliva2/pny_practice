
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

import { Stock, DashboardService } from "src/app/modules/dashboard.service";
import * as WidgedActions from './widget.actions';
import { Injectable } from '@angular/core';
 

@Injectable()
export class WidgedEffects {

    fetchIndexData$ = createEffect((): any => {   
         
            this.actions.pipe(
                ofType(WidgedActions.FETCH_STOCKS),
                switchMap(() => {
                  return  this.dashboardService.getBarsData()
                }),
                map(stocks => {
                    return stocks.map( (stock:Stock) => {
                        return {
                            ...stock,
                            name: stock.name ? stock.name: '',
                            data: stock.data ? stock.data: []
                        };
                    });
                }),
                map(stocks => {
                    return new WidgedActions.SetStocks(stocks)
                })
            )
            return of();
    })


    constructor(private actions: Actions, 
        private dashboardService: DashboardService ){}

}



     


      


   






