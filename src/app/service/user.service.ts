import { Injectable } from '@angular/core';
import { UserAccountInfo } from '../model/user-account-info';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as userAccountInfo from './../data/user-account-info.json';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUserAccountInfo(): Observable<any> {
    const info = userAccountInfo['default'];
    return of(info);
   // return this.http.get('data/user-account-info.json').pipe(
   //    tap(data => console.log(data))
   //  );
    // return null;
    // return accountInfo;
  }
}
