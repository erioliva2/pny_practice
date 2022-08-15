import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as WidgetActions from '../../shared/widgets/store/widget.actions';
import * as fromApp from '../../store/app.reducer'

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  sideBarOpen = false;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.store.dispatch(new WidgetActions.FetchStocks());
  }

  public sideBarToggler(): void {
    this.sideBarOpen = !this.sideBarOpen;
  }

}
