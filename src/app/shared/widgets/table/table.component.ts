import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import { DashboardService } from 'src/app/modules/dashboard.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy, AfterViewInit {

  suscribtion: Subscription;
  elementData:any[] = [];
  dataSource:any;
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit(): void {
    if(this.dataSource){
    this.dataSource.paginator =  this.paginator;}
  }

  constructor(private dashboardService: DashboardService) { }

  public ngOnInit(): void {
    // this.suscribtion = this.dashboardService.getTableData().subscribe((res:TableData[]) => {
    //   this.elementData = res;
    //   this.dataSource = new MatTableDataSource<PeriodicElement>(this.elementData);
    //     this.dataSource.paginator = this.paginator;
    //     this.dataSource.sort = this.sort;
    // })
  }

   ngOnDestroy(): void{
    this.suscribtion.unsubscribe();
  }
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

