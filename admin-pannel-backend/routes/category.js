const express = require("express");
const db = require("../db");
const config = require("../config");
const utils = require("../utils");

const router = express.Router();

router.post("/addCategory", (request, response) => {
  const { title, details } = request.body;

  const statement = `INSERT INTO category (title,details) VALUES(?,?)`;

  db.pool.execute(statement, [title, details], (error, result) => {
    console.log(result);
    // response.send(utils.createResult(error, result));
    response.send(utils.createResult(error, result));
  });
});

router.get("/", (request, response) => {
  const statement = `  SELECT id, title, details
    FROM Category
    WHERE isActive = 1`;

  db.pool.query(statement, (error, result) => {
    console.log(result);
    response.send(utils.createResult(error, result));
  });
});

router.delete("/:id", (request, response) => {
  const { id } = request.params;
  const statement = `DELETE FROM Category WHERE id=?`;

  db.pool.execute(statement, [id], (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
