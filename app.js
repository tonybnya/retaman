import express from "express";
import bodyParser from "body-parser";
import logger from "morgan";
import path from "path";
import { fileURLToPath } from "url";

// import routes
import tasksRoutes from "./routes/tasks.js";

// import Redis client from config
import { connectRedis } from "./config/redis.js";

// create equivalents for __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
export default app;
