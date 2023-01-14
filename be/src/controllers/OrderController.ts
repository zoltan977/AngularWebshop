import { NextFunction, Request, Response } from "express";
import OrderService from "../services/OrderService";

export class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    public add = async (req: Request, res: Response, next: NextFunction) => {
        console.log("req.body: ", req.body)
        try {
            const result = await this.orderService.add(
                req.body
            );
          
            return res.json(result);
        } catch (error) {
            next(error)
        }
    }
}