import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { DashboardService, Stock} from '../../dashboard.service';
import { Store } from '@ngrx/store';
import * as fromApp from 'src/app/store/app.reducer';
import * as StocksActions from '../../../shared/widgets/store/widget.actions'
import { map, tap } from 'rxjs/operators';
 
@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.scss']
})
export class StockListComponent implements OnInit {
  stocks: any[];

  constructor(private dashboardService: DashboardService, 
              private router: Router, 
              private route: ActivatedRoute,
              private store: Store<fromApp.AppState>
              ) { }

  ngOnInit(): void {
  this.dashboardService.getBarsData()
   .pipe(
      map((stocks: Stock[]) => {
          return stocks.map(stock => {
            return {
              ...stock,
              stock: stock.name ? stock.name : [] 
            };
          });
      }),
      tap((stocks:Stock[]) => {
        this.store.dispatch(new StocksActions.SetStocks(stocks))
      })
   ).subscribe( (res:Stock[]) => {
      this.stocks = res
    })
    
  }

}
