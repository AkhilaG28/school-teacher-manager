const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teachersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    adminId: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    classes: {
      type: Array,
      default: [],
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("Teachers", teachersSchema);
