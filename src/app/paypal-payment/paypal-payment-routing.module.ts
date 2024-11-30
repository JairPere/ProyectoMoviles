import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PayPalPaymentPage } from './paypal-payment.page';


const routes: Routes = [
  {
    path: '',
    component: PayPalPaymentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaypalPaymentPageRoutingModule {}
