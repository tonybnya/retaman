// const path = require("path");
import express from "express";

// get Redis client from config
import { client } from "../config/redis.js";

// set a router
const router = express.Router();

// route for the root endpoint
router.get("/api", async (req, res) => {
  // set up the welcome message
  const msg = "Welcome to Retaman - Redis Task Manager";
  res.json(msg);
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
router.post("/api/tasks/add", async (req, res) => {
  try {
    // get the task from the request body
    const task = req.body.task;
    // push the task to the tasks list in Redis
    await client.rPush("tasks", task);
    console.log("New Task Added...");
    res.redirect("/");
  } catch (err) {
    console.error(`Error adding the new task ${task}`, err);
    res.status(400).json({ error: `Failed to add the new task ${task}` });
  }
});

// API endpoint to delete one or multiple tasks
router.post("/api/tasks/delete", async (req, res) => {
  try {
    let tasksToDel = req.body.tasks;
    console.log("Tasks to delete (raw):", req.body.tasks);

    // Handle case when a single task is selected (string) or no tasks are selected
    if (!tasksToDel) {
      return res.status(400).json({ error: "No tasks selected for deletion." });
    }

    // Convert to array if it's a single task (string)
    if (!Array.isArray(tasksToDel)) {
      tasksToDel = [tasksToDel];
    }

    console.log("Tasks to delete (processed):", tasksToDel);

    const tasks = await client.lRange("tasks", 0, -1);

    for (let i = 0; i < tasks.length; i++) {
      if (tasksToDel.includes(tasks[i])) {
        try {
          await client.lRem("tasks", 0, tasks[i]); // <-- await here
        } catch (err) {
          console.error("Error removing task:", tasks[i], err);
        }
      }
    }

    console.log("Task(s) deleted successfully...");
    res.redirect("/");
  } catch (err) {
    console.error("Error deleting task(s):", err);
    res.status(500).json({ error: "Failed to delete task(s)." });
  }
});

// API endpoint to get call as JSON
router.get("/api/call", async (req, res) => {
  try {
    const call = await client.hGetAll("call");
    res.json(call || {});
  } catch (err) {
    console.error("Error fetching call:", err);
    res.status(500).json({ error: "Failed to fetch call" });
  }
});

// API endpoint to create the next business call
router.post("/api/call/add", async (req, res) => {
  const newCall = {};

  newCall.name = req.body.name;
  newCall.company = req.body.company;
  newCall.phone = req.body.phone;
  newCall.datetime = req.body.datetime;

  client.hSet("call", [
    "name",
    newCall.name,
    "company",
    newCall.company,
    "phone",
    newCall.phone,
    "datetime",
    newCall.datetime,
  ]);
});

export default router;
