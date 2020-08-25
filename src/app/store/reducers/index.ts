import { Transaction } from '../../model/transaction';
import { SortOrder } from '../../model/sort-order';
import { ActionReducerMap, createReducer, on } from '@ngrx/store';
import { UserAccountInfo } from '../../model/user-account-info';
import * as Actions from '../actions';

export interface TransactionHistoryState {
  transactions: Array<Transaction>;
  transactionBackup: Array<Transaction>;
  transactionSortOrder: SortOrder;
  sortBy: string;
}

const transHistoryInitialState: TransactionHistoryState = {
  transactions: [],
  transactionBackup: [],
  transactionSortOrder: SortOrder.desc,
  sortBy: 'transactionDate'
}

export interface UserAccountState {
  userAccountInfo: UserAccountInfo;
}

const userAccountInitState: UserAccountState = {
  userAccountInfo: null,
}

export interface AppState {
  transactionHistory : TransactionHistoryState;
  userAccount: UserAccountState
}

const transactionReducer = createReducer(
  transHistoryInitialState,
  on(Actions.getTransactionListSuccess, (state, { transactions }) => {
    const trans = preProcessTransactionDisplayDate(transactions);
    const sortedTransaction = sort(trans, state.sortBy, state.transactionSortOrder);
    return { ...state, transactions: sortedTransaction, transactionBackup: sortedTransaction };
  }),
  on(Actions.debit, (state, { transaction }) => {
    const transactionList = [...preProcessTransactionDisplayDate([transaction]), ...state.transactions];
    return { ...state, transactions: transactionList, transactionBackup: transactionList };
  }),
  on(Actions.filterTransactions, (state, { filterVal }) => {
    if (!filterVal) {
      return { ...state, transactions: state.transactionBackup }
    }

    return { ...state, transactions: filter(state.transactionBackup, filterVal) }
  }),
  on(Actions.sortTransactions, (state, { sortBy  }) => {
    // if sortBy key is same, that implies sortOrder is being toggled
    let sortOrder = state.transactionSortOrder;

    if (sortBy === state.sortBy) {
      sortOrder = sortOrder === SortOrder.desc ? SortOrder.asc : SortOrder.desc;
    }

    console.log(sortBy, sortOrder, state.transactionSortOrder);

    return { ...state,
      transactionSortOrder: sortOrder,
      transactions: sort(state.transactions, sortBy, sortOrder) };
  })
);

function sort(transactions: Array<Transaction>,
              sortBy: string,
              sortOrder: SortOrder): Array<Transaction> {
  return transactions.sort(
    (l,r) => {
      return l[sortBy] > r[sortBy] ? (sortOrder === SortOrder.asc ? 1 : -1) : l[sortBy] < r[sortBy] ? (sortOrder === SortOrder.asc ? -1 : 1) : 0;
    }
  )
}

function filter(transactions: Array<Transaction>, searchItem: string): Array<Transaction> {
  return [
    ...lookupMerchant(transactions, searchItem),
    ...lookupTransactionType(transactions, searchItem)
  ];
}


function lookupMerchant(transactions: Array<Transaction>, searchItem: string): Array<Transaction> {
  return transactions.filter(transaction => {
    return transaction.merchant.indexOf(searchItem) != -1
  })
}

function lookupTransactionType(transactions: Array<Transaction>, searchItem: string): Array<Transaction> {
  return transactions.filter(transaction => {
    return transaction.transactionType.indexOf(searchItem) != -1
  })
}

function preProcessTransactionDisplayDate(transactions: Array<Transaction>): Array<Transaction> {
  return transactions.map(transaction => {
    const clone = { ...transaction };
    clone.displayDate = new Date(transaction.transactionDate).toLocaleString('default', {month: 'short', day: 'numeric'})
    return clone;
  })
}

const userAccountReducer = createReducer(
  userAccountInitState,
  on(Actions.getUserAccountsInfoSuccess, (state, { userAccountInfo  }) => {
    return { ...state,  userAccountInfo: userAccountInfo}
  })
);

export const reducers: ActionReducerMap<AppState> = {
  transactionHistory: transactionReducer,
  userAccount: userAccountReducer,
};
