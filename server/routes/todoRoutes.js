const express = require("express");
const {
  createTodo,
  editTodo,
  deleteTodo,
  addTask,
  editTask,
  deleteTask,
  getUserTodos,
} = require("../controllers/todoControllers");
const router = express.Router();

router.post("/createTodo", createTodo);
router.get("/getUserTodos/:userId", getUserTodos);
router.put("/editTodo/:todoId", editTodo);
router.delete("/deleteTodo/:todoId", deleteTodo);
router.put("/addTask/:todoId", addTask);
router.put("/deleteTask/:todoId/:taskId", deleteTask);
router.put("/editTask/:todoId/:taskId", editTask);

module.exports = router;
