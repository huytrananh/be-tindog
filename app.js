var express = require("express");
var logger = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

var usersRouter = require("./routes/usersRouter");
var authRouter = require("./routes/authRouter");
var kennelRouter = require("./routes/kennelRouter")
var breedRouter = require("./routes/breedRouter")
var searchRouter = require("./routes/searchRouter")
var app = express();

app.use(logger("dev"));
app.use(express.json());

app.use(cors());
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/kennels", kennelRouter)
app.use("/breeds", breedRouter)
app.use("/search", searchRouter)

mongoose
  .connect(process.env.DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    console.log("PORT: ", process.env.PORT);
  });

module.exports = app;
