import express from "express";
import isLogged from "../middlewares/isLogged";
import { IDebtor } from "../models/debtor";
import LoanService from "../services/LoanService";

class LoanSystem {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initialzeRouter();
  }

  getDebtors(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!res.locals.user) {
      return res.status(401).json("You are not logged");
    }
  }
  private initialzeRouter() {
    this.router.get("/getDebtors", isLogged, this.getDebtors);
    this.router.put("/giveCredit", isLogged, this.giveACredit);
  }

  async giveACredit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!res.locals.user) {
      return res.status(401).json("You are not logged!");
    }
    const debtorData: IDebtor = req.body.debtor;
    const debtor : IDebtor = await LoanService.getDebtor(debtorData);

    if(!req.body.creditValue || req.body.creditValue <= 0) {
      return res.status(422).json("Incorrect credit value!");
    }

    await LoanService.giveACredit(res.locals.user, debtor, req.body.creditValue);
    return res.status(200).json({message: "Everything is correct!"});
  }

  public getRouter() {
    return this.router;
  }
}

export default LoanSystem;
