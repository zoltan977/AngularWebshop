import { Router } from "express";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";
import validationMiddleware from "../middlewares/validatorMiddleware";
import { AddOrderRequest } from "../DTO/AddOrderRequest";
import { OrderController } from "../controllers/OrderController";
import authMiddleWare from "../middlewares/authMiddleware";

export class OrderRoutes implements RoutesClassInterface {
    public path = Path.ORDER;
    public router = Router();

    private orderController: OrderController

    constructor() {
        this.orderController = new OrderController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/add', authMiddleWare(), validationMiddleware(AddOrderRequest), this.orderController.add)
        this.router.get('/getAll', authMiddleWare(true), this.orderController.getAll)
        this.router.get('/getAllByUser', authMiddleWare(), this.orderController.getAllByUser)
    }
}