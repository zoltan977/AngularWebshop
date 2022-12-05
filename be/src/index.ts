import * as dotenv from "dotenv";
import {connect, ConnectOptions, connection} from 'mongoose';
import App from "./app";
import { AuthRoutes } from "./routes/AuthRoutes";
import { TypeRoutes } from "./routes/TypeRoutes";

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

    const app = new App([
      new AuthRoutes(),
      new TypeRoutes()
    ]);

    app.listen();
})()
