const express = require("express");
const router = express.Router();

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo.controller");

router.get("/:uid", getTodos);

router.get("/todo/:uid/:id", getTodo);

router.post("/:uid", createTodo);

router.put("/:uid/:id", updateTodo);

router.delete("/:uid/:id", deleteTodo);

module.exports = router;
