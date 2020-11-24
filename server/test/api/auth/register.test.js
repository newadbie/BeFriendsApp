const expect = require("chai").expect;
const request = require("supertest");
const myDb = require("../../../db/connectDb");

const app = require("../../../app");

const isIncorrectParam = (response, incorrectParam) => {
  const errors = response.body.errors;

  return errors.filter((e) => e.param === incorrectParam.toString()).length > 0;
};

describe("POST /register", () => {
  before((done) => {
    myDb
      .connectMongo()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    myDb
      .closeMongo()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("Correct!, User has been created successfully!", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "UserTestNotExist@wp.pl",
        password: "VeryCorrectPassword!",
        confirmPassword: "VeryCorrectPassword!",
      })
      .then((res) => {
        const statusCode = res.statusCode;
        expect(statusCode).equal(200);
        done();
      })
      .catch((err) => done(err));
  });

  it("Incorrect, confirm password does not match to password", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "user2@wp.pl",
        password: "test123",
        confirmPassword: "test321",
      })
      .then((res) => {
        const statusCode = res.statusCode;
        expect(statusCode).equal(400);

        const incorrectParam = isIncorrectParam(res, "confirmPassword");
        expect(incorrectParam).equal(true);
        done();
      })
      .catch((err) => done(err));
  });
});
