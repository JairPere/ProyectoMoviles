import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaypalPaymentPageRoutingModule } from './paypal-payment-routing.module';

import { PayPalPaymentPage } from './paypal-payment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaypalPaymentPageRoutingModule
  ],
  declarations: [PayPalPaymentPage]
})
export class PaypalPaymentPageModule {}
