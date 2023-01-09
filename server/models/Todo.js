const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    todo: {
      type: String,
      required: [true, "Task is required"],
      trim: true,
      maxLength: [80, "Todo title length cannot exceed 50 characters"],
    },
    tasks: {
      type: [
        {
          task: {
            type: String,
          },
        },
      ],
    },
    user: {
      type: String,
      required: [true, "User id is required"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("todo", todoSchema);
