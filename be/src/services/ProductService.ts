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

  public async getProductList() {
    let products

    try {
      products = ProductModel.find()
    } catch (error) {
      throw new DatabaseException();
    }

    return products;
  }

  public async getProduct(productId: string) {
    let products

    try {
      products = ProductModel.findById(productId)
    } catch (error) {
      throw new DatabaseException();
    }

    return products;
  }

  public async updateProduct(productId: string, prodData: any) {
    let updated

    try {
      updated = ProductModel.findOneAndUpdate({_id: productId}, prodData, {new: true, upsert: true})
    } catch (error) {
      throw new DatabaseException();
    }

    return updated;
  }

  public async deleteProduct(productId: string) {
    let deletedProduct

    try {
      deletedProduct = ProductModel.remove({_id: productId})
    } catch (error) {
      throw new DatabaseException();
    }

    return deletedProduct;
  }
}

export default ProductService;