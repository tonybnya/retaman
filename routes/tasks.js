// const path = require("path");
import express from "express";

// get Redis client from config
import { client } from "../config/redis.js";

// set a router
const router = express.Router();

// route for the root endpoint (using EJS template)
router.get("/", async (req, res) => {
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
      error: "Failed to fetch tasks",
    });
  }
});

// API endpoint to get tasks as JSON
router.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await client.lRange("tasks", 0, -1);
    res.json(tasks || []);
  } catch (err) {
    console.error("Error fetching tasks:", err);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// API endpoint to create a task
router.post("/api/tasks", async (req, res) => {
  //
});

export default router;
