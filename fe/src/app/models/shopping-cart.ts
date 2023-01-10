import { ShoppingCartItem } from "./shopping-cart-item";

export class ShoppingCart {
    public readonly itemCount: number;
    public readonly totalPrice: number;
    public readonly items: ShoppingCartItem[] = [];
    
    constructor(items: ShoppingCartItem[], public _id: string) {
        for (const item of items) {
            this.items.push(new ShoppingCartItem(item.product, item.quantity))
        }

        let count: number = 0;
        for (const item of this.items) {
            count += item.quantity
        }

        this.itemCount = count;

        let totalPrice: number = 0;
        for (const item of this.items) {
            totalPrice += item.totalPrice
        }

        this.totalPrice = totalPrice;
    }
}