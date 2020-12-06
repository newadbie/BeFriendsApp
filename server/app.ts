import express from "express";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser';
import {connectMongo} from './db/connectDb';
import cors from 'cors';

class App {
  public app: express.Application;
  public port: number;

  constructor(port: number, controllers?: Array<express.Router>) {
    this.app = express();
    this.port = port;
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());
    this.app.use(cors({
      credentials: true,
      origin:true,
    }));
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
    connectMongo()
      .then(() => {
        this.app.listen(8080);
      })
      .catch((err) => console.log(err));
  }
}

export default App;
