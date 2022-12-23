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

    public getProductList = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.productService.getProductList();
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public getProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.id
            const result = await this.productService.getProduct(productId);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public updateProduct = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const productId = req.params.id
            const result = await this.productService.updateProduct(productId, req.body);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }

    public deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
        console.log("deleteProduct")
        try {
            const productId = req.params.id
            const result = await this.productService.deleteProduct(productId);
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}