import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction';
import { getSortBy, getSortOrder, transactionHistory } from '../store/selectors';
import * as AppAction from '../store/actions';
import { debounceTime, map, throttle, throttleTime } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SortOrder } from '../model/sort-order';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  transactions$: Observable<Array<Transaction>>;
  sortOrder$: Observable<SortOrder>;
  sortBy$: Observable<string>;
  filterForm: FormGroup;
  colorChest: Array<string>;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.store.dispatch(AppAction.getTransactionList());
    this.filterForm = this.fb.group({
      search: [null],
    });

    this.colorChest = this.randomize();
  }

  ngOnInit(): void {
    this.transactions$ = this.store.pipe(select(transactionHistory));
    this.sortOrder$ = this.store.pipe(select(getSortOrder));
    this.sortBy$ = this.store.pipe(select(getSortBy));

    this.filterForm.get('search').valueChanges.pipe(
      debounceTime(200)
    ).subscribe(
      searchVal => {
        this.store.dispatch(AppAction.filterTransactions({ filterVal: searchVal }));
      }
    )
  }

  randomize(): Array<string> {
    const colors = [];

    for (let i = 0; i < 15; i++) {
      colors.push(Math.floor(Math.random()*16777215).toString(16))
    }

    return colors;
  }

  onSort(val) {
    this.store.dispatch(AppAction.sortTransactions({ sortBy: val }))
  }


}
