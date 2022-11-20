import * as dotenv from "dotenv";
import express, {Express, Request, Response} from 'express';
import {connect, ConnectOptions, connection} from 'mongoose';

dotenv.config();

(async () => {
    connection.once("open", (_) => {
        console.log("Connected to the database");
      });
    
    connection.on("error", (err) => {
      console.error("Database connection error:", err);
      process.exit(1);
    });

    await connect(process.env.MONGO_URI as string, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      } as ConnectOptions);

    
    const app: Express = express();
    
    app.get('/', (req: Request, res: Response) => {
        res.send('Typescrit and node works')
    })
    
    app.listen(4321, () => {
        console.log('Running on 4321');
    })
})()
