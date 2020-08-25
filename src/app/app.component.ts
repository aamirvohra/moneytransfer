import { Component, OnInit } from '@angular/core';
import { AppState } from './store/reducers';
import { select, Store } from '@ngrx/store';
import * as AppAction from './store/actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'backbase';

  constructor(private store: Store<AppState>) {
    this.store.dispatch(AppAction.getUserAccountsInfo());
  }

  ngOnInit() {

  }
}
