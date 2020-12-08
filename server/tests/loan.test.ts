import chai from "chai";
import chaiHttp from "chai-http";
import request from "supertest";
import { weakPasswords, strongPasswords } from "./data";

const expect = chai.expect;
process.env.NODE_ENV = "test";
chai.use(chaiHttp);

import server from "../server";
import { response } from "express";
import { valid } from "joi";
/// TODO DEVELOP!!!

const app = server.app;

describe("Loan system", () => {
  const validCredit = {
    debtor: {
      phoneNumber: 1234567890,
      name: "Adrian",
    },
    creditValue: 9.99,
  };

  const getAccessToken = async (): Promise<string> => {
    const result = await chai.request(app).post("/login").send({
      email: "UserTestNotExist@wp.pl",
      password: 'bYuZ1"fiHeip@AOO',
    });
    const token = result.header["set-cookie"];
    return token;
  };

  before((done) => {
    chai
      .request(app)
      .post("/register")
      .send({
        email: "UserTestNotExist@wp.pl",
        password: 'bYuZ1"fiHeip@AOO',
        confirmPassword: 'bYuZ1"fiHeip@AOO',
        name: "Adrian",
      })
      .end((err, res) => {
        if (err) {
          done(err);
        }
        done();
      });
  });
  describe("#giveCredit", () => {
    it("Incorrect, user is not logged!", (done) => {
      chai
        .request(app)
        .put("/giveCredit")
        .send({
          validCredit,
        })
        .end((err, res) => {
          if (err) {
            done(err);
          }
          expect(res).status(401);
          expect(res.body).to.be.equal("You are not logged!");
          done();
        });
    });

    it("Correct! Credit is gived!", (done) => {
      getAccessToken()
        .then(async (accessToken) => {
          const result = await chai
            .request(app)
            .put("/giveCredit")
            .set("Cookie", accessToken)
            .send(validCredit);

          expect(result).status(200);
          done();
        })
        .catch((err) => done(err));
    });

    it("Incorrect! Phone is assigned to different person!", (done) => {
      getAccessToken()
        .then(async (accessToken) => {
          const invalidCredit = {
            ...validCredit,
            debtor: { ...validCredit.debtor },
          };
          invalidCredit.debtor.name = "Jakub";
          return chai
            .request(app)
            .put("/giveCredit")
            .set("Cookie", accessToken)
            .send(invalidCredit);
        })
        .then((res) => {
          expect(res).status(422);
          done();
        })
        .catch((err) => done(err));
    });

    it("Incorrect! Credit Value cannot be less or equal than 0", (done) => {
      getAccessToken()
        .then(async (accessToken) => {
          const invalidCredit = {
            ...validCredit,
            debtor: { ...validCredit.debtor },
          };
          invalidCredit.creditValue = 0;
          return chai
            .request(app)
            .put("/giveCredit")
            .set("Cookie", accessToken)
            .send(invalidCredit);
        })
        .then((result) => {
          expect(result).status(422);
          done();
        })
        .catch((err) => done(err));
    });
  });
});
