const express = require("express");

const loanController = require("../controllers/loan");
const isLogged = require("../middlewares/isLogged");

const router = express.Router();

router.post("/user/giveLoan", isLogged, loanController.postLoan);

module.exports = router;
