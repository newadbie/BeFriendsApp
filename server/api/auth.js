const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth");
const isLogged = require("../middlewares/isLogged");

router.post("/register", authController.postSignUp);

router.post("/login", authController.postSignIn);

router.post("/logout", isLogged , authController.postSignOut);

router.post("/getLoggedUser", isLogged, authController.postGetLoggedUser);

module.exports = router;
