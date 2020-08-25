import { Component, OnInit } from '@angular/core';
import { AppState } from './store/reducers';
import { select, Store } from '@ngrx/store';
import * as AppAction from './store/actions';
import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'backbase';

  constructor(private store: Store<AppState>,
              private translateService: TranslateService,
              private route: ActivatedRoute) {
    this.translateService.setDefaultLang('en');
    this.store.dispatch(AppAction.getUserAccountsInfo());
    this.translateService.use('en');
  }

  ngOnInit() {
    this.route.queryParams.subscribe(
      params => {
        if (params['lang']) {
          this.translateService.use(params['lang']);
        }
      }
    )
  }
}
