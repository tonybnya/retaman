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

// connect to Redis
// properly handling the Redis v4+ async API
const connectRedis = async () => {
  try {
    await client.connect();
    console.log("Redis Server Connected...");
  } catch (err) {
    console.error("Redis connection error:", err);
    process.exit(1);
  }
};

// Handle Redis errors
client.on("error", (err) => {
  console.error("Redis error:", err);
});

// set up the views
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// set up some middlewares
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

// set up the root endpoint
app.get("/", async (req, res) => {
  try {
    // set up the welcome message
    const msg = "Welcome to Retaman - Redis Task Manager";

    // get tasks - using Redis v4+ API with proper async handling
    const tasks = await client.lRange("tasks", 0, -1);

    res.render("index", {
      msg,
      tasks: tasks || [],
    });
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.render("index", {
      msg: "Welcome to Retaman - Redis Task Manager",
      tasks: [],
      error: "Failed to fetch tasks"
    });
  }
});

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

module.exports = app;
