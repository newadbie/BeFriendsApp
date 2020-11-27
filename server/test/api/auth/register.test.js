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

  const weakPasswords = [
    "|%/*+}+%{{#>-%,",
    "&={:$'^:'?`^_?>)",
    "?}?#]#~-&?(#]-{[",
    "*<<[#$:;-^|#:!>;",

    "8986321329875659",
    "1954504309456450",
    "8475223224738018",
    "6915316403522711",

    "tenvxjhtchkdatez",
    "bffszxkxzlgphatk",
    "jkexdnsimmtgseat",
    "okkpepwzcdhgrevs",

    "TBFWXSKHFSSGALHC",
    "ZCZSDTNRGENLWWQO",
    "WMVOPDLROMCXCULQ",
    "BJLPXENASISLOVIA",

    "\5@~<$.*&-$1(~2!",
    "6];-_^[*'&4)1-[",
    "2:,)_{*>>+0|(.+",
    "?`|$-&(|3638<~|",

    ']nr#%n;~o}<hj*"-',
    '@_^-,"d-]sj*-si{',
    ">=lrx';*bp@<>:n,",
    "d)x!..>ehru{(<u",

    ")(GQ+LHE!GFLCGGU",
    "K@.>+,%I]R?|AE-K",
    "P:PBJ&CU>~&}(M;R",
    "D{|TOE;QRI/=Y?#P",

    "4yoov2aiz1gsidqy",
    "t22tcmsrdfiw6jgh",
    "w3vxrmz073scl5b5",
    "zw8b9adgv10p8h1l",

    "N6NEKEINZ7APTYHT",
    "69LS3VG44YZMQVI5",
    "91ZIF1N81KB2MCZ9",
    "7CEC9OD5Z6LWV11H",

    "RalubMoXkaVNvvie",
    "eiuMQjzBRIMHoakD",
    "oUcCHQUXysxXHyjw",
    "VuClEEdreOJhVoWI",

    "N`cr)tvx=t$HAb%D",
    ";`#Mb.D>Y;I|Ln_G",
    "dH<#[-{H}(V[MfrP",
    ".&Ft:,`>O!R?[Q]+",

    "wDcE6SSoOPzkPwf7",
    "aMWAa48aIXlEeGDn",
    "SjEFnAa5fwMbIGUr",
    "stjh1XRkAxM8L5p2",

    "/>P`Y{2:FH4L6/8]",
    "-~R$?SEY.~X&-ZX?",
    "GW(X]_S!PRE}~1X",
    "$Q)_V[LD|0('T8HW",

    "Ev8gF9B",
    "t/g.Tgw",
    "M|s3B|`",
    "XPdU+R|",
    "vOO3EEZ",
    "u`pb)0A",
    "d?Q[Ja4",
  ];

  weakPasswords.forEach((password, index) => {
    it("Incorrect, weak password", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "user" + index + "@wp.pl",
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

  const strongPasswords = [
    "1`fqs\5e*z1@sO)o",
    'mMWX*R2y/VD|0"NE',
    "01%2y)y)bb.*FNPX",
    "w7(A@%Gdn|[u(Qua",
    '"$)ktH~|7q|l*x:)',
    "=U6C4p-|X'i=%7)v",
    "}brj0wB[i2<S#md",
    "k~:-r4Lfk_hpmL!g",
    "nANO>Oo84ZZeY(U",
    "2)S9EpiLIdo]t_Z:",
  ];

  strongPasswords.forEach((password, index) => {
    it("Correct password! Very strong!", (done) => {
      request(app)
        .post("/register")
        .send({
          email: "userCorrect" + index + "@wp.pl",
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
  after(() => {
    myDb
      .closeMongo()
      .then(() => done())
      .catch((err) => done(err));
  });
});
