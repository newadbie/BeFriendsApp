import express from "express";
import isLogged from "../middlewares/isLogged";
import Debtor, {IDebtor} from '../models/debtor';

class LoanSystem {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initialzeRouter();
  }
  private getDebtors(req : express.Request, res : express.Response, next : express.NextFunction) {
    if (!res.locals.user) {
        return res.status(401).json("You are not logged")
    }

  }

  private initialzeRouter() {
      this.router.get('getDebtors', isLogged, this.getDebtors);
  }

  public getRouter(): express.Router {
    return this.router;
  }
}

export default LoanSystem;