const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const utils = require("./utils");
const config = require("./config");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "100mb" }));

app.use(express.static("images"));

app.use((request, response, next) => {
  if (request.url == "customer/signup" || request.url == "/customer/signin") {
    next();
  } else {
    const token = request.headers["token"];
    console.log(request.headers["token"]);
    if (!token || token.length == 0) {
      response.send(utils.createError("missing token"));
      return;
    }

    try {
      const payload = jwt.verify(token, config.secret);

      request.user = payload;

      next();
    } catch (ex) {
      response.send(utils.createError("invalid token"));
    }
  }
});

const userRouter = require("./routes/customers");

app.use("/customer", userRouter);

app.listen(4100, "0.0.0.0", () => {
  console.log("server started on port 4100");
});
