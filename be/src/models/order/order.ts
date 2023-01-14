import {Schema, model, Document} from 'mongoose';
import { CartModelWithoutDateInterface } from '../../DTO/CartDTO';
import { ItemSchema } from '../cart/cart';

export interface OrderModelInterface {
    _id: string;
    name: string;
    address: string;
    city: string;
    cart: CartModelWithoutDateInterface;
    userEmail: string;
}

const CartSchemaWithoutDate = new Schema<CartModelWithoutDateInterface>({
  items: [ItemSchema],
});

export const OrderSchema = new Schema<OrderModelInterface>({
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    cart: {
      type: CartSchemaWithoutDate,
      required: true
    },
    userEmail: {
      type: String,
      required: true
    }
  });
  
 const OrderModel = model<Document & OrderModelInterface>("order", OrderSchema);

 export default OrderModel;
  