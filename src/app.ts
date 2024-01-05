import express, { Application } from "express";
import mongoose from "mongoose";
import compression from "compression";
import cors from "cors";
import morgan from "morgan";
import Controller from "@interfaces/controller.interface";
import ErrorMiddleware from "@middleware/error.middleware";
import helmet from "helmet";

class App {
  public express: Application;
  public port: number;
  constructor(controllers: Controller[], port: number) {
    this.express = express();
    this.port = port;

    this.initDB();
    this.initMiddleWare();
    this.initControllers(controllers);
    this.initErrorHandling();
  }

  private initMiddleWare(): void {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: false }));
    this.express.use(compression());
    this.express.use(helmet());
    this.express.use(cors());
    this.express.use(morgan("dev"));
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.express.use("/", controller.router);
    });
  }

  private initErrorHandling(): void {
    this.express.use(ErrorMiddleware);
  }
  private initDB(): void {
    const MONGO_URI = process.env.MONGO_URI!;
    mongoose
      .connect(MONGO_URI, {
        dbName: "ACM-Events",
      })
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((error) => {
        console.log("Error connecting to database: ", error);
      });
  }

  public listen(): void {
    this.express.listen(this.port, () => {
      console.log(`Backend running on port ${this.port}`);
    });
  }
}

export default App;
