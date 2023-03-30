import { Product } from "./product-model";

export class ShoppingCartItem {
    public readonly product!: Product;
    public readonly quantity!: number;

    constructor(init: ShoppingCartItem) {
        Object.assign(this, init)
    }

    get totalPrice() {
        return this.product.price * this.quantity
    }
}