const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
  permission: { type: Boolean, require: true }, // "true" for requiring lecturer approval
  quantity: { type: Number, require: true },
  borrowed: { type: Number, default: 0 },
});

module.exports = mongoose.model("component", componentSchema);
