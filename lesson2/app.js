const express = require("express");
const morgan = require("morgan");

const PORT = 8090;

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded());

app.get(
  "/users",
  (req, res, next) => {
    console.log("This is middleware");
    res.setHeader("Cookie", "name=John");
    const err = new Error("That's all");
    err.status = 401;
    // next(err);
    next();
  },
  (req, res, next) => {
    console.log("This is second middleware");
    next();
  },
  (req, res) => {
    res.send("Hello from server");
  }
);

app.post("/comments", (req, res) => {
  console.log("body", req.body);
  res.send(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
