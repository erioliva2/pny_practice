import { Injectable } from '@angular/core';
import {  map, tap } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { webSocket } from 'rxjs/webSocket';

import * as fromApp from '../store/app.reducer'
import * as stockActions from '../shared/widgets/store/widget.actions';
 
const CHAT_URL4 =  'ws://localhost:5000/data2';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private pieDataApiUrl = 'http://localhost:5000/pieData';
  private tableDataApiUrl = 'http://localhost:5000/tableData';
  private barsDataApiUrl = 'http://localhost:5000/data2';
  private dataApiUrl = 'http://localhost:5000/data';

  constructor(private http: HttpClient, 
              private store: Store<fromApp.AppState>) {}


  public getCoinData(): any {
    return webSocket('wss://ws.coincap.io/prices?assets=bitcoin');
  }

  public getBarsData(): Observable<Stock[]> {
    return this.http.get<Stock[]>(this.barsDataApiUrl);
  }

  public getPieData(): Observable<PieData[]> {
   return this.http.get<any[]>(this.dataApiUrl)
    .pipe(
      map((pieDataList: any) => {
        return pieDataList.map((pieData: PieData) => {
            return {
              ...pieData,
              pieData: pieData.name, data: pieData.data 
            }
         })
      }),
      tap((pieData: PieData[]) => {
        this.store.dispatch(new stockActions.SetPieData(pieData))
      })
    )
  }

  public getSelected(item: string): Observable<Stock[]>{
     return this.http.get<Stock[]>(this.barsDataApiUrl).pipe(
      map( res => res.filter(r => r.name === item)) 
    ) 
  }


}

export interface Stock {
  name: string;
  data: number[];
}

export interface PieData  {
  name: string,
  data: [{
    name: string,
    index: number
  }];
}

  export const data2 = 
  [
    {
    name: 'S&P-500',
    data: [2040, 1050, 2275, 2877, 2410, 2190, 3800, 4640]
    },
    {
      name: 'DOW-JONES',
      data: [1040, 2050, 1275, 3877, 2410, 3190, 1800, 4640]
    },
    {
      name: 'NASDAQ-100',
      data: [4, 8000, 5554, 9955, 240, 31669, 1800, 777]
    },
    {
      name: 'RUSSELL-2000',
      data: [4444, 9888, 3334, 4433, 5544, 434, 5555, 9999]
    }
]


