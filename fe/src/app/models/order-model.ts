import { prop, required } from "@rxweb/reactive-form-validators";
import { ShoppingCart } from "./shopping-cart";

export class Order {
    constructor(init?: Order) {
        if (init) {
            Object.assign(this, init)
            this.cart = new ShoppingCart(init.cart)
        }
    }

    _id!: string;

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
export class OrderWithDate extends Order {
    public readonly dateCreated: Date | undefined;

    constructor(init?: OrderWithDate) {
        if (init) {
            super(init);
            this.dateCreated = init?.dateCreated;
        } else {
            super();
        }
    }
}