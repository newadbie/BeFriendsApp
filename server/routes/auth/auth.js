const express = require('express');
const router = express.Router();

const authController = require("../../controllers/auth");

router.post("/register", authController.postSignIn);

module.exports = router;