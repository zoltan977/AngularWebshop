import { NextFunction, Request, Response } from "express";
import ProductService from "../services/ProductService";

export class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    public addProduct = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.productService.addProduct(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

}