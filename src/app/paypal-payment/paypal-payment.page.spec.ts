import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PayPalPaymentPage } from './paypal-payment.page';

describe('PaypalPaymentPage', () => {
  let component: PayPalPaymentPage;
  let fixture: ComponentFixture<PayPalPaymentPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PayPalPaymentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
