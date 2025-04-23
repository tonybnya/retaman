const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const redis = require("redis");
const path = require("path");

// init the main app
const app = express();
// set up the server port
const port = 3000;

// set up the views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.listen(port);
console.log(`Server started on port ${port}...`);

module.exports = app;
