const Todo = require("../models/Todo");
const createError = require("../utils/createError");

exports.createTodo = async (req, res, next) => {
  try {
    const { todo, task, userId } = req.body;

    if (!todo || !task || !userId) {
      return next(
        createError({
          message: "UserId, Todo and Task are required to proceed",
          statusCode: 400,
        })
      );
    }

    const addTodo = await Todo.create({
      todo: todo.toUpperCase(),
      tasks: [{ task: task.charAt(0).toUpperCase() + task.slice(1) }],
      user: userId,
    });

    res.status(200).json({
      todoAdded: true,
      todo: addTodo,
      message: "Todo has been added",
    });
  } catch (error) {
    // return next(error.message);
    res.status(400).json({
      message: error.message,
    });
  }
};

exports.getUserTodos = async (req, res, next) => {
  try {
    const user = req.params.userId;
    if (!user) {
      return next(
        createError({
          message: "No user id found",
          status: 400,
        })
      );
    }

    const todos = await Todo.find({ user });
    if (!todos) {
      return next(
        createError({
          message: "Invalid user id",
          status: 400,
        })
      );
    }
    const sortName = await Todo.find({ user }).sort({ todo: 1 });
    const sortLatest = await Todo.find({ user }).sort({ createdAt: -1 });
    const sortUpdated = await Todo.find({ user }).sort({ updatedAt: -1 });

    res.status(200).json({
      success: true,
      todos,
      sortName,
      sortLatest,
      sortUpdated,
    });
  } catch (error) {
    return next(error.message);
  }
};

exports.editTodo = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const todo = req.body;

    const todos = await Todo.findByIdAndUpdate(todoId, todo);

    res.status(200).json({
      success: true,
      message: "Todo title updated successfully",
      todos,
    });
  } catch (error) {
    return next(error.message);
  }
};

exports.deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.todoId);
    res.status(200).json({
      success: true,
      message: "Todo deleted successfully",
    });
  } catch (error) {
    return next(error.message);
  }
};

exports.addTask = async (req, res, next) => {
  try {
    const todoId = req.params.todoId;
    const { task } = req.body;

    if (!task.trim()) {
      return next(
        createError({ status: 400, message: "Enter task to add in your todo" })
      );
    }

    const todo = await Todo.findOneAndUpdate(
      { _id: todoId },
      {
        $push: {
          tasks: [{ task: task.charAt(0).toUpperCase() + task.slice(1) }],
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Task added successfully",
    });
  } catch (error) {
    return next(error.message);
  }
};

exports.editTask = async (req, res, next) => {
  try {
    const { todoId, taskId } = req.params;
    const { updatedTask } = req.body;

    if (!updatedTask.trim()) {
      return next(createError({ status: 400, message: "Enter new task" }));
    }

    const uptd = await Todo.updateOne(
      { _id: todoId },
      {
        $set: {
          "tasks.$[elemT].task":
            updatedTask.charAt(0).toUpperCase() + updatedTask.slice(1),
        },
      },
      { arrayFilters: [{ "elemT._id": taskId }] }
    );

    res.status(200).json({
      success: true,
      message: "Task edited successfully",
    });
  } catch (error) {
    return next(error.message);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const { todoId, taskId } = req.params;

    const uptd = await Todo.updateOne(
      { _id: todoId },
      {
        $pull: {
          tasks: {
            _id: taskId,
          },
        },
      }
    );

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    return next(error.message);
  }
};
