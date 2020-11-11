const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

// OLD MONGO CONNECTION - mLAB
// var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget"

// mongoose.connect(MONGODB_URI, {
//   useNewUrlParser: true,
//   useFindAndModify: false
// });

// NEW MONGO CONNECTION - OBJECT ROCKET

mongoose.connect(process.env.ORMONGO_URL, {
  user: process.env.ORMONGO_USER,
  pass: process.env.ORMONGO_PASS,
});
mongoose.connection.on("connected", function () {
  console.log(
    "Mongoose successfully connected to Db at" + process.env.ORMONGO_URL
  );
});
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});
