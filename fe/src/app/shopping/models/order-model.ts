import { oneOf, prop, required } from "@rxweb/reactive-form-validators";
import { ShoppingCart } from "../../shared/models/shopping-cart";

export interface DropDownListItemInterface {
    value: string;
    displayValue: string;
}

export const OrderStatusList: DropDownListItemInterface[] = [
    {
        value: 'NEW',
        displayValue: 'Új, feldolgozás alatt'
    }, 
    {
        value: 'PICKING',
        displayValue: 'Összekészítés alatt'
    }, 
    {
        value: 'PACKED',
        displayValue: 'Összekészítve'
    },
    {
        value: 'COMPLETED',
        displayValue: 'Teljesítve'
    }, 
    {
        value: 'RETURNED',
        displayValue: 'Visszaküldve'
    }, 
    {
        value: 'CANCELLED',
        displayValue: 'Törölve'
    }, 
];

export const DeliveryMethods: DropDownListItemInterface[] = [{
    value: 'CLICK_AND_COLLECT',
    displayValue: 'Személyes átvétel'
}, {
    value: 'HOME_DELIVERY',
    displayValue: 'Házhoz szállítás'
}, {
    value: 'LOCKER_DELIVERY',
    displayValue: 'Csomagpontra szállítás'
}];

export const PaymentMethods: DropDownListItemInterface[] = [{
    value: 'CASH',
    displayValue: 'Készpénz'
}, {
    value: 'CREDIT_CARD',
    displayValue: 'Hitelkártya'
}, {
    value: 'BANK_TRANSFER',
    displayValue: 'Átutalás'
}];

export class PaymentAndDeliveryFormModel {
    @required()
    @oneOf({matchValues: DeliveryMethods.map(dm => dm.value)})
    deliveryMethod!: string;

    @required()
    @oneOf({matchValues: PaymentMethods.map(pm => pm.value)})
    paymentMethod!: string;
}

export class OrderFormModel {
    constructor(init?: OrderFormModel) {
        if (init) {
            Object.assign(this, init)
            this.cart = new ShoppingCart(init.cart)
        }
    }

    @required()
    name!: string;

    @required()
    address!: string;

    @required()
    city!: string;

    @required()
    userEmail!: string;
    
    @prop()
    cart!: ShoppingCart;
}
export class OrderDataToAPI extends OrderFormModel {
    public readonly deliveryMethod: string;
    public readonly paymentMethod: string;
    
    constructor(init: OrderDataToAPI) {
        super(init);
            
        this.deliveryMethod = init.deliveryMethod;
        this.paymentMethod = init.paymentMethod;
    }

    get deliveryMethodDisplayName(): string {
        return DeliveryMethods.find(dm => dm.value === this.deliveryMethod)?.displayValue || "";
    }
    get paymentMethodDisplayName(): string {
        return PaymentMethods.find(pm => pm.value === this.paymentMethod)?.displayValue || "";
    }
}

export class OrderDataFromAPI extends OrderDataToAPI {
    public readonly dateCreated: Date;
    public readonly orderStatus: string;
    public readonly _id: string;

    constructor(init: OrderDataFromAPI) {
        super(init);
            
        this.dateCreated = new Date(init.dateCreated);
        this.orderStatus = init.orderStatus;
        this._id = init._id;
    }

    get orderStatusDisplayName(): string {
        return OrderStatusList.find(os => os.value === this.orderStatus)?.displayValue || "";
    }
}


    