const taskRouter = require("express").Router();
const mongoose = require("mongoose");
const Task = require("../models/taskModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

// retrieve token
const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    return authorization.substring(7);
  }
  return null;
};

// get all tasks
taskRouter.post("/gettasks", async (req, res) => {
  const user = req.body.user; 

  const tasks = await Task.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  var userTasks = tasks.filter(task => user === task.user.id);

  res.json(userTasks);
});

//  get task by id
taskRouter.get("/:id", async (req, res) => {
  const user = req.body.user; 
  const task = await Task.findById(req.params.id);
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token is missing or is invalid" });
  }
  const tasks = await Task.find({}).populate("user", {
    username: 1,
    name: 1,
  });


  if (task && task.user.id === user) {
    res.json(task);
  } else {
    res.status(404).end();
  }
});

// create a task
taskRouter.post("/", async (req, res) => {
  const taskContent = req.body;
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token is missing or is invalid" });
  }

  const user = await User.findById(taskContent.userId);

  const task = new Task({
    title: taskContent.title,
    taskTime: taskContent.taskTime,
    date: new Date(),
    user: user._id,
  });

  const savedTask = await task.save();
  user.tasks = user.tasks.concat(savedTask._id);
  await user.save();

  res.json(savedTask);
});

// delete a task by id
taskRouter.delete("/:id", async (req, res) => {
  const token = getTokenFrom(req);
  const decodedToken = jwt.verify(token, config.SECRET);

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token is missing or is invalid" });
  }
  // for future check whether the task that was requested to be deleted belonged to the user that is signed in 
  await Task.findByIdAndDelete(req.params.id);

  res.status(204).end();
});

module.exports = taskRouter;

