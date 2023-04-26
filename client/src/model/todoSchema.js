/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

const ToDoSchema = new mongoose.Schema({
  data: {
    type: String,
    required: true,
  },
  done: {
    type: Boolean,
    default: false,
  },
  isChecked: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
