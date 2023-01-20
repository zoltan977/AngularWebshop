import {propArray, required} from   "@rxweb/reactive-form-validators"   


export class CustomerName {
    @required()
    name!: string;
}

export class DeliveryAddress {
    @required()
    address!: string;

    @required()
    city!: string;
}

export class UserAccountFormModel {
    @propArray(CustomerName)
    customerNames!: CustomerName[];

    @propArray(DeliveryAddress)
    deliveryAddresses!: DeliveryAddress[];
}