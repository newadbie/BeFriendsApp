const mongoose = require("mongoose");
const secrets = require("../secret");

function connectMongo() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV.toString().trim() === "test") {
      const Mockgoose = require("mockgoose").Mockgoose;
      const mockgoose = new Mockgoose(mongoose);

      mockgoose.prepareStorage()
      .then(() => {
        mongoose
          .connect(secrets.URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
          .then((res, err) => {
            if (err) {
              reject(err);
            }
            resolve();
          });
      });
    } else {
      mongoose
        .connect(secrets.URI, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) {
            reject(err);
          }
          resolve();
        });
    }
  });
};

module.exports.connectMongo = connectMongo;

module.exports.closeMongo = () => {
  return mongoose.disconnect();
};
