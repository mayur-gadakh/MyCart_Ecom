const express = require("express");
const db = require("../db");
const multer = require("multer");
const utils = require("../utils");
const upload = require({ dest: "images" });

const router = express.Router();

router.post("/", upload.single("image"), (request, response) => {
  const { title, details, categoryId, brandId, price, tags } = request.body;
  const statement = `INSERT INTO Product (title, details, categoryId, brandId, price, tags,image) VALUES(?,?,?,?,?,?,?)`;

  const image = request.file.filename;

  db.pool.execute(
    statement,
    [title, details, categoryId, brandId, price, tags, image],
    (error, result) => {
      response.send(utils.createResult(error, result));
    }
  );
});

module.exports = router;
