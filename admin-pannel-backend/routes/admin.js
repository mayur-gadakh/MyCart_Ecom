const express = require("express");
const db = require("../db");
const utils = require("../utils");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const config = require("../config");

const router = express.Router();

router.post("/signup", (request, response) => {
  const { firstName, lastName, email, password, phone } = request.body;

  const statement = `INSERT INTO Admin (firstName, lastName, email, password, phone) VALUES(?,?,?,?,?)`;

  const encryptedPassword = String(CryptoJS.MD5(password));

  db.pool.execute(
    statement,
    [firstName, lastName, email, encryptedPassword, phone],
    (error, result) => {
      console.log(result);
      // response.send(utils.createResult(error, result));
      response.send(utils.createSuccess(result));
    }
  );
});

router.post("/signin", (request, response) => {
  const { email, password } = request.body;

  const encryptedPassword = String(CryptoJS.MD5(password));

  const statement = `SELECT ID,firstName,lastName,isActive,phone from Admin where email=? and password=?`;

  db.pool.query(statement, [email, encryptedPassword], (error, admin) => {
    if (error) {
      response.send(utils.createError(error));
    } else {
      if (admin.length == 0) {
        response.send(utils.createError("Admin Does Not Exist"));
      } else {
        const { firstName, lastName, email, phone } = admin[0];

        const payload = {
          firstName,
          lastName,
          email,
          phone,
        };

        const token = jwt.sign(payload, config.secret);

        response.send(
          utils.createSuccess({
            token,
            firstName,
            lastName,
            phone,
          })
        );
      }
    }
  });
});

module.exports = router;
