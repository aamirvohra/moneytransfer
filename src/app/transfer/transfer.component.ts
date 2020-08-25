import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from '../store/reducers';
import { UserAccountInfo } from '../model/user-account-info';
import { BehaviorSubject, Observable } from 'rxjs';
import { userAccountInfo } from '../store/selectors';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import * as AppAction from '../store/actions';
import { Transaction } from '../model/transaction';
import { formatCurrency } from '@angular/common';

@Component({
  selector: 'app-transfer',
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.scss']
})
export class TransferComponent implements OnInit {

  transferForm: FormGroup;
  userAccountInfo: UserAccountInfo;
  isPreview: BehaviorSubject<boolean>;

  constructor(private store: Store<AppState>,
              private fb: FormBuilder) {
    this.isPreview = new BehaviorSubject<boolean>(false);

    this.transferForm = this.fb.group({
      from: [{value: '', disabled: true}, Validators.required],
      to: ['', Validators.required],
      amount: [null, [
          Validators.required,
          Validators.pattern("\\d+\\.?\\d+$"),
      ]]
    });

    this.isPreview.pipe(
      tap(isPreviewMode => {
        if (isPreviewMode)
          this.transferForm.disable();
        else {
          this.transferForm.get('to').enable();
          this.transferForm.get('amount').enable();
        }
      })
    ).subscribe();
  }

  ngOnInit(): void {
    this.store.pipe(select(userAccountInfo)).subscribe(
      userAccountInfo => this.userAccountInfo = userAccountInfo
    );

    this.setAccountType();

  }

  private setAccountType() {
    this.transferForm.get('from').setValue(
      `${this.userAccountInfo.accountType}  ${(this.userAccountInfo.accountNumber)} - $(${formatCurrency(this.userAccountInfo.balance, 'en', '','CAD', '2.2-2')})`);
  }

  hasAmount() {
    return !!this.transferForm.get('amount').value;
  }

  processTransaction() {
    const debitAmount = this.transferForm.get('amount').value;
    if ( debitAmount > (this.userAccountInfo.balance + 500)) {
      console.log('Debit Amount more than balance plus overdraft');
      return;
    }

    this.isPreview.next(true);
  }

  confirmTransaction() {
    const transaction = new Transaction();
    const formValues = this.transferForm.value;
    transaction.amount = formValues.amount;
    transaction.merchant = formValues.to;
    transaction.transactionDate = new Date().getTime();
    transaction.transactionType = 'Transaction';

    this.store.dispatch(AppAction.debit({transaction}));
    this.formCleanup();
  }

  formCleanup() {
    this.transferForm.reset();
    this.isPreview.next(false);
    this.setAccountType();
  }

}
