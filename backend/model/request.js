const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  _id: { type: String, unique: true, default: null },
  component_list_ids: { type: Array, require: true },
  request_date: { type: Date, require: true },
  return_date: { type: Date, require: true },
  pickup_date: { type: String },
  borrower_id: { type: String, require: true },
  lecturer_id: { type: String },
  student_status: { type: String, require: true }, //include (canceled, picked up, returned),
  lecturer_status: { type: String, require: true }, //include (pending, approved, canceled),
  technician_status: { type: String, require: true } //include (pending, approved, canceled)
});

module.exports = mongoose.model("request", requestSchema);
