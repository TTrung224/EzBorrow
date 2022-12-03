const mongoose = require("mongoose");

const componentSchema = new mongoose.Schema({
  name: { type: String, require: true },
  description: { type: String },
  img_src: { type: String, require: true },
  permission: { type: Boolean, require: true }, // "true" for requiring lecturer approval
  quantity: { type: Number, require: true },
  borrowed: { type: Number, default: 0 },
  available_amount: { type: Number},
});

module.exports = mongoose.model("component", componentSchema);
