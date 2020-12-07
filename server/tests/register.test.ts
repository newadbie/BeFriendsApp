import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import { weakPasswords, strongPasswords } from "./data";

const expect = chai.expect;
process.env.NODE_ENV = "test";
chai.use(chaiHttp);

import server from "../server";
/// TODO DEVELOP!!!

const app = server.app;

describe("Authorization", () => {
  describe("#POST /register", () => {
    it("Correct!, User has been created successfully!", (done) => {
      chai
        .request(app)
        .post("/register")
        .send({
          email: "UserTestNotExist@wp.pl",
          password: 'bYuZ1"fiHeip@AOO',
          confirmPassword: 'bYuZ1"fiHeip@AOO',
          name: "Adrian"
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
          name: "Adrian"
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
          name: "Adrian"
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res.body.message).to.have.equal(
            "This email is already in use!"
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
          name: "Adrian"
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).to.have.status(422);
          expect(res.body.message).to.have.equal(
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
            name: "Adrian"
          })
          .end((err, res) => {
            if (err) {
              done(err);
            }
            expect(res).to.have.status(422);
            expect(res.body.message).to.have.equal("Password is too weak!");
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
            name: "Adrian"
          })
          .then((res) => {
            expect(res).to.have.status(200);
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
          name: "Adrian"
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
            expect(res.body).to.be.equal("Email or password is incorrect");
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
            expect(result.error).equal(false);
            expect(result).to.have.status(200);
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
          const cookies = res.header["set-cookie"];

          request(app)
            .post("/login")
            .set("Cookie", cookies)
            .send({
              email: "strongUser1@wp.pl",
              password: strongPasswords[1],
            })
            .then((result) => {
              const errorMessage = JSON.parse(result.error.text).message;
              expect(result).to.have.status(401);
              done();
            })
            .catch((err) => done(err));
        })
        .catch((err) => done(err));
    });
  });

  after(async (done) => {
    done();
  });
});
