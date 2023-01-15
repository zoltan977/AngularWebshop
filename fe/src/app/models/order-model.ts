import { prop, required } from "@rxweb/reactive-form-validators";
import { ShoppingCart } from "./shopping-cart";

export class Order {
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