import { Component, Input, OnInit } from '@angular/core';
import { Stock } from '../../dashboard.service';
import {FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.scss']
})
export class StockItemComponent implements OnInit {

  @Input() stock: Stock;
  @Input() index: string;

  constructor() { }

  ngOnInit(): void {
  }

}
