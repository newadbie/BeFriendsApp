const express = require("express");
const router = express.Router();

const { body } = require("express-validator");

const authController = require("../controllers/auth");

router.post(
  "/register",
  [
    body("email").isEmail().exists().trim(),
    body("password").exists().trim().isLength({ min: 5 }),
    body("confirmPassword")
      .exists()
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords does not match!");
        }
        return true;
      }),
  ],
  authController.postSignIn
);

module.exports = router;
