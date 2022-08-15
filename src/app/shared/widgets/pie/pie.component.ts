import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params, Router } from '@angular/router';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting'
import { Subscription } from 'rxjs';
import {map, mapTo, take} from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { DashboardService, Stock } from 'src/app/modules/dashboard.service';
import * as fromApp from '../../../store/app.reducer';


@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent implements OnInit, OnDestroy {

  Highcharts = Highcharts;
  chartOptions:{} = {};
  chartData: any[] = [];
  suscription: Subscription;
  id: string = '';

  constructor(private dashboardService: DashboardService,
              private router: Router, 
              private store: Store<fromApp.AppState> ) { }


    ngOnInit(): void {

        // this.router.events
        //         .subscribe((params: Params) => {
        //             if(params['snapshot']?.params.id){
        //             this.id = params['snapshot'].params.id;
                      
        //                 this.store.select('stocks')
        //                 .pipe(
        //                     map( stocksState => {
        //                          return stocksState.stocks.find((stock: Stock) => {
        //                             return stock.name === this.id
        //                          })
        //                     })
        //                 ).subscribe(stock => {
        //                     this.chartData = [stock];
        //                     console.log('stocks store ==> ', stock)
        //                     this.chartPie();
        //                     console.log('stocks=>', stock)
        //                 })
        //             }
        //         })       
        // this.chartPie();
    }

            // this.suscription = this.dashboardService.getPieData().subscribe((res:any) => {
            //     let selectedItem = res.find((item: DATA2) => item.index === this.id )
            
            //         console.log('selected item ----> ', selectedItem)

            //         if(selectedItem){
            //             this.chartData = [];
            //             selectedItem.data.forEach((element: any) => {
            //                 this.chartData.push([element.name, element.size])
            //                 console.log('data ====> ', this.chartData)
            //                 this.chartPie();
            //             });
            //         }
            // })
    // })
    // this.chartPie();
//   }


  private chartPie(): void {
    this.chartOptions = {
        chart: {
            type: 'pie',
            options3d: {
                enabled: true,
                alpha: 45
            }
        },
        title: {
            text: this.id
        },
        subtitle: {
            text: ''
        },
        plotOptions: {
            pie: {
                innerSize: 100,
                depth: 45,
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                connectorColor: 'silver'
            }
            }
        },
        series: [{
            name: 'p/e',
            data: this.chartData
      }]
  };
  }

  ngOnDestroy(): void {
      this.suscription.unsubscribe();
  }
}
