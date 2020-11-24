const express = require("express");
const connectDb = require('./db/connectDb').connectMongo;

const bodyParser = require("body-parser");

const authApi = require("./api/auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use(authApi);

connectDb()
.then(() => 
{
  app.listen(8080);
})
.catch(err => console.log(err))


module.exports = app;