const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: [true, "This username already exists"]
    },
    password: String,
    campus: {
      type: String,
      enum: ["Madrid", "Barcelona", "Miami", "Paris", "Berlin", "Amsterdam", "México", "Sao Paulo", "Lisbon"]
    },
    course: {
      type: String,
      enum: ["Web Dev", "UX/UI", "Data Analytics"]
    },
    image: String
  },
  {
    timestamps: true,
  }
);

const User = model("User", userSchema);

module.exports = User;
