import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Observable, of, pipe } from "rxjs";
import { DashboardService, Stock } from "src/app/modules/dashboard.service";
import { map, switchMap, take } from "rxjs/operators";
import { Store } from "@ngrx/store";
import * as fromApp from '../../store/app.reducer';
import * as WidgetActions from '../widgets/store/widget.actions';
import { Actions, ofType } from "@ngrx/effects";

@Injectable({ providedIn: 'root' })
export class WidgetResolverService implements Resolve<Stock[]> {

    constructor(private dasborardService: DashboardService, 
                private store: Store<fromApp.AppState>,
                private actions: Actions){}

    resolve(route: ActivatedRouteSnapshot, 
            state: RouterStateSnapshot): 
            Stock[] | Observable<Stock[]> | Promise<Stock[]> {
        
        // this.dasborardService.getBarsData()
        return this.store.select('stocks').pipe(
            take(1),
            map(widgetState => {
                console.log('widgetState====>', widgetState)
                return widgetState.stocks
            }),
            switchMap( stocks => {
                console.log('widgetState stocks====>', stocks)
                if(stocks.length === 0) {
                    console.log('if stocks.length === 0====>', stocks)
                    this.store.dispatch(new WidgetActions.FetchStocks())
                    return this.actions.pipe(
                        ofType(WidgetActions.SET_STOCKS),
                        take(1)
                    );
                } else {
                    console.log('widgetState stocks else====> ', stocks, stocks.length)
                    return of(stocks)
                }
            })
        )
    }

    
}

