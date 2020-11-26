const express = require("express");

const loanController = require("../controllers/loan");
const isLogged = require("../middlewares/isLogged");

const router = express.Router();

router.put("/user/giveLoan", isLogged, loanController.postLoan);

router.get("/user/getLoans", isLogged, loanController.getLoans);

module.exports = router;
