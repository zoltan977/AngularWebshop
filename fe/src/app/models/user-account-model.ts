import {email, propArray, required} from   "@rxweb/reactive-form-validators"   


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

    @required()
    @email()
    userEmail!: string;
}

export class CustomerNameData {
    public readonly _id: string = "";
    public readonly name: string = "";

    constructor(init?: CustomerNameData) {
        if (init) {
            this._id = init._id;
            this.name = init.name;
        }
    }
}

export class DeliveryAddressData {
    public readonly _id: string = "";
    public readonly address: string = "";
    public readonly city: string = "";

    constructor(init?: DeliveryAddressData) {
        if (init) {
            this._id = init._id;
            this.address = init.address;
            this.city = init.city;
        }
    }
}

export class UserAccountData {
    public readonly _id: string = "";
    public readonly customerNames: CustomerNameData[] = [];
    public readonly deliveryAddresses: DeliveryAddressData[] = [];

    constructor (init?: UserAccountData) {
        if (init) {
            this._id = init._id;
            this.customerNames = init.customerNames;
            this.deliveryAddresses = init.deliveryAddresses;
        }
    }
}