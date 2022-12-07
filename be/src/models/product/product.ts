import {Schema, model, Document} from 'mongoose';

export interface ProductModelInterface {
    title: string;
    price: number;
    category: string;
    imageURL: string;
}

const ProductSchema = new Schema<ProductModelInterface>({
    title: {
      type: String,
      required: true,
      unique: true
    },
    price: {
      type: Number,
      required: true
    },
    category: {
      type: String,
      required: true
    },
    imageURL: {
      type: String,
      required: true
    }
  });
  
 const ProductModel = model<Document & ProductModelInterface>("product", ProductSchema);

 export default ProductModel;
  