import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import {Path} from '../constants/enum/Path';
import { RoutesClassInterface } from "../interfaces/RoutesClassInterface";

export class AuthRoutes implements RoutesClassInterface {
    public path = Path.USER_AUTH;
    public router = Router();

    private authController: AuthController

    constructor() {
        this.authController = new AuthController();
        this.initRoutes();
    }

    private initRoutes() {
        this.router.post('/signUp', this.authController.signUp)
        this.router.post('/login', this.authController.login)
    }
}