import express from "express";
import isLogged from "../middlewares/isLogged";
import { IDebtor } from "../models/debtor";
import LoanService from "../services/LoanService";
import { joiPayFilter } from "../utils/queryValidate";

class LoanSystem {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initialzeRouter();
  }

  private initialzeRouter() {
    this.router.get(
      "/getAllGivenCredits/:payStatus?",
      isLogged,
      this.getCredits
    );
    this.router.put("/giveCredit", isLogged, this.giveACredit);
  }

  async getCredits(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!res.locals.user) {
      return res.status(401).json("You are not logged");
    }
    try {
      const { payStatus } = req.query.payStatus !== null ? await joiPayFilter.validateAsync(req.query) : null;
      const data = await LoanService.getCountedDebtorCredits(res.locals.user, payStatus);
      return res.status(200).json(data);
    } catch (err) {
      return res.status(401).json(err);
    }
  }

  async giveACredit(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!res.locals.user) {
      return res.status(401).json("You are not logged!");
    }
    try {
      const debtorData: IDebtor = req.body.debtor;

      if (!req.body.creditValue || req.body.creditValue <= 0) {
        return res.status(422).json("Incorrect credit value!");
      }

      const debtor: IDebtor = await LoanService.getDebtor(debtorData);
      await LoanService.giveACredit(
        res.locals.user,
        debtor,
        req.body.creditValue
      );
    } catch (err) {
      return res.status(422).json(err);
    }

    return res.status(200).json({ message: "Everything is correct!" });
  }

  public getRouter() {
    return this.router;
  }
}

export default LoanSystem;
