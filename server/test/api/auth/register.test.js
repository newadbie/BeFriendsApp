const expect = require("chai").expect;
const request = require("supertest");
const myDb = require("../../../db/connectDb");
const { strongPasswords, weakPasswords } = require("../data");

const app = require("../../../app");
describe("AUTH", () => {
  before(() => {
    myDb
      .connectMongo()
      .then(() =>  done())
      .catch((err) => done(err));
  });
  describe("#POST /register", () => {
    it("Correct!, User has been created successfully!", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "UserTestNotExist@wp.pl",
          password: 'bYuZ1"fiHeip@AOO',
          confirmPassword: 'bYuZ1"fiHeip@AOO',
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
          password: 'bYuZ1"fiHeip@AOO',
          confirmPassword: 'bYuZ1"fiHeip@AOQ',
        })
        .then((result) => {
          const errorMessage = JSON.parse(result.error.text).message;
          const statusCode = result.statusCode;
          expect(statusCode).equal(422);
          expect(errorMessage).equal("Password does not matches");

          done();
        })
        .catch((err) => done(err));
    });

    it("Incorrect, email is already in use!", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "UserTestNotExist@wp.pl",
          password: "[&vKFw[vHD%N2y=w!",
          confirmPassword: "[&vKFw[vHD%N2y=w!",
        })
        .then((result) => {
          const errorMessage = JSON.parse(result.error.text).message;
          const statusCode = result.statusCode;
          expect(errorMessage).equal("Email is already in use!");
          expect(statusCode).equal(422);
          done();
        })
        .catch((err) => {
          done(err);
        });
    });

    it("Incorrect, empty password", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "UserTestNotExist@wp.pl",
          password: "",
          confirmPassword: "",
        })
        .then((result) => {
          const errorMessage = JSON.parse(result.error.text).message;
          const statusCode = result.statusCode;
          expect(statusCode).equal(422);
          expect(errorMessage).equal('"password" is not allowed to be empty');
          done();
        })
        .catch((err) => done(err));
    });

    weakPasswords.forEach((password, index) => {
      it("Incorrect, weak password", (done) => {
        request(app)
          .post("/register")
          .send({
            email: "weakUser" + index + "@wp.pl",
            password: password,
            confirmPassword: password,
          })
          .then((result) => {
            const errorMessage = JSON.parse(result.error.text).message;
            const statusCode = result.statusCode;
            expect(statusCode).equal(422);
            expect(errorMessage).equal("Password is too weak!");
            done();
          })
          .catch((err) => done(err));
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
  });

  describe("#POST /login", () => {
    weakPasswords.forEach((password, index) => {
      it("Incorrect user is not created!", (done) => {
        request(app)
          .post("/login")
          .send({
            email: "weakUser" + index + "@wp.pl",
            password: password,
          })
          .then((result) => {
            const errorMessage = JSON.parse(result.error.text).message;
            const statusCode = result.statusCode;

            expect(statusCode).equal(401);
            expect(errorMessage).equal("Email is not registered");
            done();
          })
          .catch((err) => done(err));
      });
    });
  
    
    strongPasswords.forEach((password, index) => {
      
      it("Correct! User is logged in!", done => {
        request(app).post("/login").send({
          email: "strongUser" + index + "@wp.pl",
          password: password
        })
        .then(result => {
          const statusCode = result.statusCode;
          cookies = result.header['set-cookie'];
          expect(result.error).equal(false)
          expect(statusCode).equal(200);
          done();
        }).catch(err => done(err))
      })
    })
 
    it("Incorrect user is already logged", done => {
      request(app).post("/login").send({
        email: "strongUser0@wp.pl",
        password: strongPasswords[0]
      })
      .then(res => {
        const cookies = res.headers['set-cookie'];

        request(app).post("/login")
        .set('Cookie', cookies)
        .send({
          email: "strongUser1@wp.pl",
          password: strongPasswords[1]
        }).then(result => {
          const errorMessage = JSON.parse(result.error.text).message;
          const statusCode = result.statusCode;
          expect(statusCode).equal(401);
          expect(errorMessage).equal("Logged users cannot log in again!")
          done()
        })
        .catch(err => done(err))
      })
      .catch(err => done(err))
    })
  });

  after(() => {
    myDb
      .closeMongo()
      .then(() => done())
      .catch((err) => done(err));
  });
});
