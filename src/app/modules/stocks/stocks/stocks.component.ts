import { Component, OnInit } from '@angular/core';
import { DashboardService, Stock} from '../../dashboard.service';

@Component({
  selector: 'app-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.scss']
})
export class StocksComponent implements OnInit {
  selectedStock: Stock;
   

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    // this.dashboardService.recipeSelected.subscribe(
    //   (stock: Stock) => {
    //     this.selectedStock = stock;
    //   }
    // )
  }
   

}
