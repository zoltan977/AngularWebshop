import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentAndDeliveryFormComponent } from './payment-and-delivery-form.component';

describe('PaymentAndDeliveryFormComponent', () => {
  let component: PaymentAndDeliveryFormComponent;
  let fixture: ComponentFixture<PaymentAndDeliveryFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentAndDeliveryFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentAndDeliveryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
