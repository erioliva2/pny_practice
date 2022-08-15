import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatListModule} from '@angular/material/list';
import { BarsComponent } from './widgets/bars/bars.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { TableComponent } from './widgets/table/table.component';
import {MatTableModule} from '@angular/material/table';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PieComponent } from './widgets/pie/pie.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {RouterModule} from '@angular/router';
import { StockItemComponent } from 'src/app/modules/stocks/stock-item/stock-item.component';
import { StockListComponent } from 'src/app/modules/stocks/stock-list/stock-list.component';
import { StocksComponent } from 'src/app/modules/stocks/stocks/stocks.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatCheckboxModule} from '@angular/material/checkbox';
 
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BarsComponent,
    TableComponent,
    PieComponent,
    StockItemComponent,
    StockListComponent,
    StocksComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatMenuModule,
    MatListModule,
    HighchartsChartModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,                               
    ReactiveFormsModule,
    RouterModule,
    MatSidenavModule,
    MatDividerModule,
    MatCardModule,
    MatCheckboxModule
    
  ],
  providers: [],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BarsComponent,
    TableComponent,
    PieComponent,
    StockItemComponent,
    StockListComponent,
    StocksComponent,
    MatCheckboxModule
  ]
})
export class SharedModule { }
