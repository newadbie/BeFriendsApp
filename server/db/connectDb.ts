import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import { URI } from "../secret";

export const connectMongo = async function connectMongo() {
  if (process.env.NODE_ENV && process.env.NODE_ENV.toString()  === "test") {
    const mongod = new MongoMemoryServer();
    return mongod.getUri().then((uri) => {
      return mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    });
  } else {
    return mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

export const closeMongo = () => {
  return mongoose.disconnect();
};
