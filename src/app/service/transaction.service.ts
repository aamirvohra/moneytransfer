import { Injectable } from '@angular/core';
import { Transaction } from '../model/transaction';
import { Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import * as transactions from './../data/transactions.json';
import * as userAccountInfo from '../data/user-account-info.json';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private store: Store<AppState>) {}

  getTransactionList(): Observable<Array<Transaction>> {
    const transaction: Array<any> = transactions['default']['data'];
    transaction.map(trans => trans.amount = parseInt(trans.amount));
    return of(transaction);
  }

}
