const express = require("express");
const db = require("../db");
const utils = require("../utils");
const { route } = require("./admin");

const router = express.Router();

router.post("/", (request, response) => {
  const { title, details } = request.body;

  const statement = `INSERT INTO ProductBrand(title,details) VALUES(?,?)`;

  db.pool.query(
    `SELECT * FROM ProductBrand WHERE title=?`,
    [title],
    (error, categories) => {
      if (error) {
        response.send(utils.createError(error));
      } else {
        if (categories.length == 0) {
          db.pool.execute(statement, [title, details], (error, result) => {
            response.send(utils.createResult(error, result));
          });
        } else {
          response.send(
            utils.createError("Brand Title Exist ,Please try Different Title")
          );
        }
      }
    }
  );
});

router.get("/", (request, response) => {
  const statement = `SELECT id,title,details FROM ProductBrand WHERE isActive=1`;

  db.pool.query(statement, (error, result) => {
    response.send(utils.createResult(error, result));
  });
});

module.exports = router;
