import { prop, required } from "@rxweb/reactive-form-validators";
import { DropDownListItemInterface } from "./dropdownlist-item-interface";
import { ShoppingCart } from "../../shared/models/shopping-cart";

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
}

export class OrderDataFromAPI extends OrderDataToAPI {
    public readonly dateCreated: Date;
    public readonly orderStatus: string;
    public readonly _id: string;

    constructor(init: OrderDataFromAPI) {
        super(init);
            
        this.dateCreated = init.dateCreated;
        this.orderStatus = init.orderStatus;
        this._id = init._id;
    }
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
    