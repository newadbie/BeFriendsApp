const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const secrets = require("../secret");

module.exports.connectMongo = async function connectMongo() {
  if (process.env.NODE_ENV.toString().trim() === "test") {
    const mongod = new MongoMemoryServer();
    return mongod.getUri().then((uri) => {
      return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  } else {
    return mongoose.connect(secrets.URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

module.exports.closeMongo = () => {
  return mongoose.disconnect();
};
