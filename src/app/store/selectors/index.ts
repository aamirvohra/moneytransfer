import { AppState } from '../reducers';

export const userAccountInfo = (state: AppState) => {
  return state.userAccount.userAccountInfo;
}

export const transactionHistory = (state: AppState) => {
  return state.transactionHistory.transactions;
}

export const getSortOrder = (state: AppState) => {
  return state.transactionHistory.transactionSortOrder;
}

export const getSortBy = (state: AppState) => {
  return state.transactionHistory.sortBy;
}

