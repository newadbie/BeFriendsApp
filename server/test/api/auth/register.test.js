const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;

chai.use(chaiHttp);

const request = require("supertest");
const myDb = require("../../../db/connectDb");
const { strongPasswords, weakPasswords } = require("../data");

const app = require("../../../app");
const { response } = require("../../../app");
describe("AUTH", () => {
  before(() => {
    myDb
      .connectMongo()
      .then(() => done())
      .catch((err) => done(err));
  });
  describe("#POST /register", () => {
    it("Correct!, User has been created successfully!", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          email: "UserTestNotExist@wp.pl",
          password: 'bYuZ1"fiHeip@AOO',
          confirmPassword: 'bYuZ1"fiHeip@AOO',
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(200);
          done();
        });
    });

    it("Incorrect, confirm password does not match to password", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          email: "user2@wp.pl",
          password: 'bYuZ1"fiHeip@AOO',
          confirmPassword: 'bYuZ1"fiHeip@AOQ',
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(422);
          expect(res.body.message).to.deep.equal("Password does not matches");

          done();
        });
    });

    it("Incorrect, email is already in use!", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          email: "UserTestNotExist@wp.pl",
          password: "[&vKFw[vHD%N2y=w!",
          confirmPassword: "[&vKFw[vHD%N2y=w!",
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.message).to.deep.have.equal(
            "Email is already in use!"
          );
          expect(res).to.have.status(422);
          done();
        });
    });

    it("Incorrect, empty password", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          email: "UserTestNotExist@wp.pl",
          password: "",
          confirmPassword: "",
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(422);
          console.log(res.body);
          expect(res.body.message).to.deep.have.equal(
            '"password" is not allowed to be empty'
          );
          done();
        });
    });

    weakPasswords.forEach((password, index) => {
      it("Incorrect, weak password", (done) => {
        chai
          .request(app)
          .post("/register")
          .send({
            email: "weakUser" + index + "@wp.pl",
            password: password,
            confirmPassword: password,
          })
          .end((err, res) => {
            if (err) {
              done(err);
            }
            expect(res).to.have.status(422);
            expect(res.body.message).to.deep.have.equal(
              "Password is too weak!"
            );
            done();
          });
      });
    });

    strongPasswords.forEach((password, index) => {
      it("Correct password! Very strong!", (done) => {
        request(app)
          .post("/register")
          .send({
            email: "strongUser" + index + "@wp.pl",
            password: password,
            confirmPassword: password,
          })
          .then((res) => {
            const statusCode = res.statusCode;
            expect(statusCode).equal(200);
            done();
          })
          .catch((err) => done(err));
      });
    });

    //TODO check email validation
    it("Incorrect, email is not correct", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          email: "Incorrect.pl",
          password: strongPasswords[0],
          confirmPassword: strongPasswords[0],
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(422);
          expect(res.body.message).to.have.deep.equal(
            '"email" must be a valid email'
          );
          done();
        });
    });
  });

  describe("#POST /login", () => {
    weakPasswords.forEach((password, index) => {
      it("Incorrect user is not created!", (done) => {
        chai
          .request(app)
          .post("/login")
          .send({
            email: "weakUser" + index + "@wp.pl",
            password: password,
          })
          .end((err, res) => {
            if (err) {
              done(err);
            }
            expect(res.body.message).to.deep.equal("Email is not registered");
            expect(res).to.have.status(401);
            done();
          });
      });
    });

    strongPasswords.forEach((password, index) => {
      it("Correct! User is logged in!", (done) => {
        request(app)
          .post("/login")
          .send({
            email: "strongUser" + index + "@wp.pl",
            password: password,
          })
          .then((result) => {
            const statusCode = result.statusCode;
            cookies = result.header["set-cookie"];
            expect(result.error).equal(false);
            expect(statusCode).equal(200);
            done();
          })
          .catch((err) => done(err));
      });
    });

    it("Incorrect user is already logged", (done) => {
      request(app)
        .post("/login")
        .send({
          email: "strongUser0@wp.pl",
          password: strongPasswords[0],
        })
        .then((res) => {
          const cookies = res.headers["set-cookie"];

          request(app)
            .post("/login")
            .set("Cookie", cookies)
            .send({
              email: "strongUser1@wp.pl",
              password: strongPasswords[1],
            })
            .then((result) => {
              const errorMessage = JSON.parse(result.error.text).message;
              const statusCode = result.statusCode;
              expect(statusCode).equal(401);
              expect(errorMessage).equal("Logged users cannot log in again!");
              done();
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    });
  });

  after(() => {
    myDb
      .closeMongo()
      .then(() => done())
      .catch((err) => done(err));
  });
});
