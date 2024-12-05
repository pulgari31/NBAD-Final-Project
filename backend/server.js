const express = require("express");
require("dotenv").config();

const app = express();

const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const url = process.env.DATABASE_URL;

const jwt = require("jsonwebtoken");
const { expressjwt } = require("express-jwt");
const CryptoJS = require("crypto-js");
const userSchema = require("./models/user_schema");
const summaryChartSchema = require("./models/summary_chart_schema");
const reportsChartSchema = require("./models/reports_chart_schema");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = 3000;

const secretKey = process.env.JWT_SECRET_KEY;

const jwtMW = expressjwt({
  secret: secretKey,
  algorithms: ["HS256"],
});

app.post("/api/addUser", (req, res) => {
  const user = {
    id: req.body.id,
    username: encrypt(req.body.username),
    password: encrypt(req.body.password),
  };
  mongoose
    .connect(url)
    .then(() => {
      let newUser = new userSchema(user);
      userSchema
        .insertMany(newUser)
        .then(() => {
          res.json({ message: "New user inserted." });
          mongoose.connection.close();
          return;
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  mongoose
    .connect(url)
    .then(() => {
      userSchema
        .find({})
        .then((data) => {
          if (data.length === 0) {
            res.status(401).json({
              success: false,
              token: null,
              err: "No users in the database",
            });
            mongoose.connection.close();
            return;
          }
          for (let user of data) {
            let decryptedUsername = decrypt(user.username);
            let decryptedPassword = decrypt(user.password);
            if (
              username == decryptedUsername &&
              password == decryptedPassword
            ) {
              let token = jwt.sign(
                { id: user.id, username: decryptedUsername },
                secretKey
              );
              res.json({
                success: true,
                token: token,
                err: null,
              });
              mongoose.connection.close();
              return;
            }
          }
          res.status(401).json({
            success: false,
            token: null,
            err: "username or password is incorrect !!!",
          });
          mongoose.connection.close();
          return;
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.get("/api/summary/chart", jwtMW, (req, res) => {
  if (mongoose.connection.readyState != 0) {
    res.status(400).json({ message: "Send request after some time." });
    return;
  }
  mongoose
    .connect(url)
    .then(() => {
      summaryChartSchema
        .find({})
        .then((data) => {
          res.json({ summaryChartData: data });
          mongoose.connection.close();
          return;
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.get("/api/reports/chart", jwtMW, (req, res) => {
  if (mongoose.connection.readyState != 0) {
    res.status(400).json({ message: "Send request after some time." });
    return;
  }
  mongoose
    .connect(url)
    .then(() => {
      reportsChartSchema
        .find({})
        .then((data) => {
          res.json({ reportsChartData: data });
          mongoose.connection.close();
          return;
        })
        .catch((connectionError) => {
          console.log(connectionError);
        });
    })
    .catch((connectionError) => {
      console.log(connectionError);
    });
});

app.use(function (err, req, res, next) {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({
      success: false,
      officialError: err,
      err: "Username or password is incorrect",
    });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Serving on port ${PORT} ...`);
});

function encrypt(text) {
  let encryptedText = CryptoJS.AES.encrypt(
    text,
    process.env.ENCRYPTION_KEY
  ).toString();
  return encryptedText;
}

function decrypt(encryptedText) {
  let decryptedText = CryptoJS.AES.decrypt(
    encryptedText,
    process.env.ENCRYPTION_KEY
  ).toString(CryptoJS.enc.Utf8);
  return decryptedText;
}
