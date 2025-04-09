const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  level: { type: String, default: null }, // User's level after test or learning path completion
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
