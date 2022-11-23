const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  _id: { type: String, unique: true, default: null },
  component_list_ids: { type: Array, require: true },
  request_date: { type: Date, require: true },
  return_date: { type: Date, require: true },
  pickup_date: { type: String },
  borrower_id: { type: String, require: true },
  lecturer_id: { type: String },
  status: { type: String, require: true}, //include (pending, approved, canceled, picked up, returned)
});

module.exports = mongoose.model("request", requestSchema);
