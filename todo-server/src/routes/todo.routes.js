const express = require("express");
const router = express.Router();

const {
  getTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/index.controller");

router.get("/", getTodos);

router.get("/todo/:id", getTodo);

router.post("/", createTodo);

router.put("/:id", updateTodo);

router.delete("/:id", deleteTodo);

module.exports = router;
