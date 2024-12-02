const express = require("express");
const utils = require("../utils");
const db = require("../db");
const cofing = require("../config");
const cryptojs = require("crypto-js");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", (request, response) => {
  const { firstName, lastName, email, password, phone } = request.body;

  const statement = `INSERT INTO Customer (firstName,lastName,email,password,phone) VALUES(?,?,?,?,?)`;

  const encryptedPassword = String(cryptojs.MD5(password));

  db.pool.execute(
    statement,
    [firstName, lastName, email, encryptedPassword, phone],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

module.exports = router;
