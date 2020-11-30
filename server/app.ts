import express from "express";
import mongoose from "mongoose";
import { URI } from "./secret";

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number, controllers?: Array<express.Router>) {
    this.app = express();
    this.port = port;

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
