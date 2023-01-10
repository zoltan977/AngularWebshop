import { Product } from "./product-model";

export class ShoppingCartItem {
    constructor(public readonly product: Product, public readonly quantity: number) {}

    get totalPrice() {
        return parseInt(this.product.price) * this.quantity
    }
}