import { prop, required } from "@rxweb/reactive-form-validators";
import { ShoppingCart } from "./shopping-cart";

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
export class OrderData extends OrderFormModel {
    public readonly deliveryMethod: string | undefined;
    public readonly paymentMethod: string | undefined;
    
    constructor(init?: OrderData) {
        super(init);
            
        this.deliveryMethod = init?.deliveryMethod;
        this.paymentMethod = init?.paymentMethod;
    }
}

export class OrderDataWithDateAndId extends OrderData {
    public readonly dateCreated: Date | undefined;
    public readonly _id: string | undefined;

    constructor(init?: OrderDataWithDateAndId) {
        super(init);
            
        this.dateCreated = init?.dateCreated;
        this._id = init?._id;
    }
}