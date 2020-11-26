const connectDb = require("./db/connectDb").connectMongo;
const express = require("express");

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

const authApi = require("./api/auth");
const loanApi = require("./api/loan");

const app = express();

app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cookieParser());

app.use(authApi);
app.use(loanApi);

connectDb()
  .then(() => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));

module.exports = app;
