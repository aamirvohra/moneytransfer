import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BankingComponent } from './banking/banking.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'banking',
    pathMatch: 'full',
  },
  {
    path: 'banking',
    component: BankingComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
