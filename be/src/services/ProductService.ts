import { AddProductRequestInterface } from "../DTO/AddProductRequest";
import { DatabaseException } from "../exceptions/DatabaseException";
import ProductModel from "../models/product/product";

class ProductService {
  public async addProduct(productData: AddProductRequestInterface) {
      console.log("productData:", productData)

      let savedProduct
      try {
        const newProduct = new ProductModel(productData);
        savedProduct = await newProduct.save();
    
      } catch (error) {
        console.log("Error creating Product: ", error);
        throw new DatabaseException();
      }
      
      return savedProduct;
  }

}

export default ProductService;