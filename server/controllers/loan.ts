import express from "express";
import isLogged from "../middlewares/isLogged";
import { IDebtor } from "../models/debtor";
import { payStatus } from "../models/cretdit";
import DebtorService from "../services/DebtorService";
import LoanService from "../services/LoanService";
import { joiPayFilter } from "../utils/queryValidate";

class LoanSystem {
  private readonly router: express.Router;

  constructor() {
    this.router = express.Router();
    this.initialzeRouter();
  }

  private initialzeRouter = () => {
    this.router.get(
      "/getAllGivenCredits/:payStatus?",
      isLogged,
      this.getCredits
    );
    this.router.get(
      "/getDebtorCredits/:payStatus?",
      isLogged,
      this.getDebtorCredits
    );
    this.router.put("/giveCredit", isLogged, this.giveACredit);
  };

  getDebtorCredits = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const { _id }: { _id: string } = req.body;
    let payFilter: payStatus | null;

    switch (req.query.payStatus?.toString().toLowerCase()) {
      case "paid":
        payFilter = payStatus.paid;
        break;
      case "unpaid":
        payFilter = payStatus.unpaid;
        break;
      default:
        payFilter = null;
        break;
    }
    if (!_id) {
      return res.status(422).json("Invalid data");
    }
    try {
      const debtor = await DebtorService.getDebtorById(_id);
      if (!debtor) {
        return res.status(422).json("Invalid data");
      }
      const debtorCredits = await LoanService.getDebtorCredits(
        res.locals.user,
        debtor,
        payFilter ? payFilter : undefined
      );

      return res.status(200).json({ message: "OK", credtis: debtorCredits });
    } catch (err) {
      console.log(err);
      return res.status(422).json("Something went wrong");
    }
  };

  getCredits = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!res.locals.user) {
      return res.status(401).json("You are not logged");
    }
    try {
      const { payStatus } =
        req.query.payStatus !== null
          ? await joiPayFilter.validateAsync(req.query)
          : null;
      const data = await LoanService.getCountedDebtorCredits(
        res.locals.user,
        payStatus
      );
      return res.status(200).json(data);
    } catch (err) {
      return res.status(401).json(err);
    }
  };

  giveACredit = async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    if (!res.locals.user) {
      return res.status(401).json("You are not logged!");
    }
    try {
      const debtorData: IDebtor = req.body.debtor;

      if (!req.body.creditValue || req.body.creditValue <= 0) {
        return res.status(422).json("Incorrect credit value!");
      }

      const debtor: IDebtor = await DebtorService.getValidDebtor(debtorData);
      await LoanService.giveACredit(
        res.locals.user,
        debtor,
        req.body.creditValue
      );
    } catch (err) {
      return res.status(422).json(err);
    }

    return res.status(200).json({ message: "Everything is correct!" });
  };

  public getRouter = () => {
    return this.router;
  };
}

export default LoanSystem;
