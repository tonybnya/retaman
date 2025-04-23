const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const path = require("path");

// import routes
const tasksRoutes = require("./routes/tasks");

// import Redis client from config
const { connectRedis } = require("./config/redis");

// init the main app
const app = express();

// set up the server port
const port = 3000;

// set up the views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up some middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// use routes
app.use("/", tasksRoutes);

// initialize Redis connection and start server
(async () => {
  await connectRedis();

  app.listen(port, () => {
    console.log(`Server started on port ${port}...`);
  });
})().catch((err) => {
  console.error("Startup error:", err);
  process.exit(1);
});

// export just the app
module.exports = app;
