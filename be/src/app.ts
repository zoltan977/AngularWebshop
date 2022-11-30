import express, {Application} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import {StatusCodes} from 'http-status-codes';

class App {
    readonly app: Application;

    constructor() {
        this.app = express();

        this.initMiddlewares();
        this.initRoutes();
        this.initErrorHandling();
    }

    private initErrorHandling() {
    }

    private initRoutes() {
        this.app.use('/', (req, res, next) => {
            res.status(StatusCodes.OK).send('PAGE NOT FOUND');
        });
    }

    private initMiddlewares() {
        this.app.use(cors());
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded());
    }

    public getServer(): any {
        return this.app;
    }

    public listen(): void {
        const DEFAULT_PORT = 5000;
        this.app.listen(process.env.PORT || DEFAULT_PORT, () => {
            console.log(`App listening on the port ${process.env.PORT || DEFAULT_PORT}`);
        });
    }
}

export default App;