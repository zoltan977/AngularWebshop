import {email, propArray, required} from   "@rxweb/reactive-form-validators"   

export class CustomerName {
    public readonly _id?: string;

    @required()
    name: string = "";
}

export class DeliveryAddress {
    public readonly _id?: string;

    @required()
    address: string = "";

    @required()
    city: string = "";
}

export class UserAccountFormModel {
    public readonly _id?: string;

    @propArray(CustomerName)
    customerNames: CustomerName[] = [new CustomerName()];

    @propArray(DeliveryAddress)
    deliveryAddresses: DeliveryAddress[] = [new DeliveryAddress()];

    @required()
    @email()
    userEmail: string = "";

    constructor (init?: UserAccountFormModel) {
        if (init) {
            Object.assign(this, init)
        }
    }
}
