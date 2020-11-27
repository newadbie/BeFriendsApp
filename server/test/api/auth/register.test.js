const expect = require("chai").expect;
const request = require("supertest");
const myDb = require("../../../db/connectDb");

const app = require("../../../app");

describe("POST /register", () => {
  before(() => {
    myDb
      .connectMongo()
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
        expect(statusCode).equal(422);

        done();
      })
      .catch((err) => done(err));
  });

  it("Incorrect, email is already in use!", (done) => {
    request(app)
      .post("/register")
      .send({
        email: "UserTestNotExist@wp.pl",
        password: "VeryCorrectPassword!",
        confirmPassword: "VeryCorrectPassword!",
      })
      .then((result) => {
        const statusCode = result.statusCode;
        expect(statusCode).equal(422);
        done();
      })
      .catch((err) => {
        done(err);
      });
  });
  after(() => {
    myDb
    .closeMongo()
    .then(() => done())
    .catch((err) => done(err));
  })
});


