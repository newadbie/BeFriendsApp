import express from "express";
import mongoose from "mongoose";
import { URI } from "./secret";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number, controllers?: Array<express.Router>) {
    this.app = express();
    this.port = port;
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    if (controllers) {
      this.initializeControllers(controllers);
    }
  }

  private initializeControllers(controllers: Array<express.Router>) {
    controllers.forEach((controller) => {
      this.app.use(controller);
    });
  }

  public listen() {
    mongoose
      .connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => {
        this.app.listen(8080);
      })
      .catch((err) => console.log(err));
  }
}

export default App;
