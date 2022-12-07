import { Router } from "express";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";
import validationMiddleware from "../middlewares/validatorMiddleware";
import { AddProductRequest } from "../DTO/AddProductRequest";
import { ProductController } from "../controllers/ProductController";
import authMiddleWare from "../middlewares/authMiddleware";

export class ProductRoutes implements RoutesClassInterface {
    public path = Path.PRODUCT;
    public router = Router();

    private productController: ProductController

    constructor() {
        this.productController = new ProductController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/addProduct', authMiddleWare(true), validationMiddleware(AddProductRequest), this.productController.addProduct)
    }
}