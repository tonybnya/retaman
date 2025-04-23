const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const redis = require("redis");
const path = require("path");

// init the main app
const app = express();

// set up the server port
const port = 3000;

// create Redis client
const client = redis.createClient();

// set up the views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up some middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// set up the root endpoint
app.get("/", (req, res) => {
  // set up the welcome message
  const msg = "Welcome to Retaman - Redis Task Manager";

  res.render("index", {
    msg,
  });
});

// Initialize Redis connection and start server
(async () => {
  await connectRedis();

  app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
  });
})().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});

module.exports = app;
