import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { ShoppingCart } from "src/app/models/shopping-cart";

export const orderCartValidator: ValidatorFn = (control:AbstractControl<ShoppingCart>) : ValidationErrors | null => {
    const cart = control.value;
    console.log("orderCartValidator cart: ", cart)
    const hasId = !!cart._id;
    const hasItems = !!cart.items.length;
    const cartValid = hasId && hasItems;
    
    return !cartValid ? {cartValid:true}: null;
}