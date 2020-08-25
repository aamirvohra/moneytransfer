import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as AppActions from '../actions';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { UserService } from '../../service/user.service';
import { TransactionService } from '../../service/transaction.service';
import { of } from 'rxjs';

@Injectable()
export class AppEffects {
  getUserAccountInfo$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.getUserAccountsInfo),
    mergeMap(action => this.userService.getUserAccountInfo().pipe(
      map(userAccountInfo => AppActions.getUserAccountsInfoSuccess({userAccountInfo})),
      catchError(error => of(error))
    ))
  ));



  getTransactions$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.getTransactionList),
    mergeMap(action => this.transactionService.getTransactionList().pipe(
      map(transactions => AppActions.getTransactionListSuccess({ transactions: transactions })),
      catchError(error => of(error))
    ))
  ));
  //
  // filterTransactions$ = createEffect(() => this.actions$.pipe())
  //
  // sort = createEffect(() => this.actions$.pipe())

  constructor(private actions$: Actions,
              private userService: UserService,
              private transactionService: TransactionService) {}
}
