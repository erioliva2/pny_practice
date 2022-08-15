import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as Highcharts from 'highcharts';
import {  of } from 'rxjs';
import { delay, concatMap } from 'rxjs/operators';

import { DashboardService, Stock } from 'src/app/modules/dashboard.service';
import * as fromApp from '../../../store/app.reducer';

@Component({
  selector: 'app-bars',
  templateUrl: './bars.component.html',
  styleUrls: ['./bars.component.scss']
})
export class BarsComponent implements OnInit {

  id: string = '';
  title = 'Angular-RxJsWebSocket-HighCharts';
  rate: any;
  chardata: any[] = [];
  chartOptions: any;
  Highcharts =  Highcharts;

  constructor(private dashboardService: DashboardService,
              private router: Router,
              private store: Store<fromApp.AppState>) {}


    ngOnInit(): void {
        this.router.navigate(['./'])
        this.router.events
            .subscribe((params: Params) => {
                if(params['snapshot']?.params.id){
                    this.id = params['snapshot'].params.id;

                        /** using the resolver with store */
                        let stockItem = {};
                        let listItem = params['snapshot'].data[0]
                        if(listItem){
                            stockItem = listItem.find((item:Stock)  => item.name === this.id )
                        }
                        if(listItem){
                            this.chardata = [stockItem];
                            this.onSelectIndex();
                            console.log('bars STOCK DATA ++++---> ', this.chardata)
                        }
                    }
            })      
            this.onSelectCoin();
        }

            /** Coin chart */
            private onSelectCoin(): void {
                this.rate = this.dashboardService.getCoinData().pipe(
                    concatMap(item => of (item).pipe(delay(1000)))
                        ).subscribe((data: Object) => {
                            this.rate = data;
                            console.log('bitcoin live data', data)
                            this.chardata.push(Number(this.rate.bitcoin))
                            this.chartOptions = {
                                series: [{
                                    data: this.chardata,
                                }, ],
                                chart: {
                                    type: "line",
                                    zoomType: 'x'
                                },
                                title: {
                                    text: this.id,
                                },
                            };
                        })
            }
            
            /** Index chart */
            private onSelectIndex(): void {
                    this.chartOptions = {
                        chart: {
                            type: 'line',
                            options3d: {
                                enabled: true,
                                alpha: 45
                            }
                        },
                        title: {
                            text: this.id
                        },
                        plotOptions: {
                            pie: {
                                innerSize: 100,
                                depth: 45
                            }
                        },
                        series: this.chardata //[{name: 'SPX', data: [1,15,9,20,4]}]
                    };   
            }

}



    /** using the store slect  */
    // this.store.select('stocks')
    // .pipe(
    //     map( stocksState => {
    //         return stocksState.stocks.find((stock: Stock) => {
    //             return stock.name === this.id
    //         })
    //     }),
    // ).subscribe(stock => {
    //     this.data = stock
    //     // this.chardata = [stock];
    //     // this.onSelectItem();
    //     console.log('bars STOCK DATA ++++---> ', this.data)
    // })