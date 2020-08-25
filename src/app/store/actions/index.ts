import { createAction, props } from '@ngrx/store';
import { Transaction } from '../../model/transaction';
import { UserAccountInfo } from '../../model/user-account-info';

export const getUserAccountsInfo = createAction(
  'User Account Info',
);

export const getUserAccountsInfoSuccess = createAction(
  'User Account Info Success',
  props<{userAccountInfo: UserAccountInfo}>()
);

export const getUserAccountsInfoError = createAction(
  'User Account Info Error',
  props<{error:string}>()
);

export const debit = createAction(
  'Debit',
  props<{transaction: Transaction}>()
);

export const getTransactionList = createAction(
  'Fetch Transactions',
);

export const getTransactionListSuccess = createAction(
  'Fetch Transactions Success',
  props<{transactions: Array<Transaction>}>()
);

export const getTransactionListError = createAction(
  'Fetch Transactions Error',
);

export const filterTransactions = createAction(
  'Filter Transactions',
  props<{filterVal: string}>()
);

export const sortTransactions = createAction(
  'Sort Transactions',
  props<{sortBy: string}>()
);

