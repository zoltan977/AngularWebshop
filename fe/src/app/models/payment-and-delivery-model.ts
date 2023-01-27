import { oneOf, required } from "@rxweb/reactive-form-validators";

export const DeliveryMethods = [{
    value: 'CLICK_AND_COLLECT',
    displayValue: 'Személyes átvétel'
}, {
    value: 'HOME_DELIVERY',
    displayValue: 'Házhoz szállítás'
}, {
    value: 'LOCKER_DELIVERY',
    displayValue: 'Csomagpontra szállítás'
}];

export const PaymentMethods = [{
    value: 'CASH',
    displayValue: 'Készpénz'
}, {
    value: 'CREDIT_CARD',
    displayValue: 'Hitelkártya'
}, {
    value: 'BANK_TRANSFER',
    displayValue: 'Átutalás'
}]

export class PaymentAndDeliveryFormModel {
    @required()
    @oneOf({matchValues: DeliveryMethods.map(dm => dm.value)})
    deliveryMethod!: string;

    @required()
    @oneOf({matchValues: PaymentMethods.map(pm => pm.value)})
    paymentMethod!: string;
}