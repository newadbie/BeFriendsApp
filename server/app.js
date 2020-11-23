const secrets = require("./secret"); 

const express = require("express");
const mongoose = require("mongoose");

const bodyParser = require("body-parser");

const authRoutes = require("./routes/auth/auth");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, PUT");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
  });

app.use(authRoutes);

mongoose.connect(secrets.URI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => 
{
  app.listen(8080);
})
.catch(err => console.log(err))
