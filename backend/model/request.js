const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  component_list: { type: Array, require: true }, //[{"id" : "a", "amount" : 1}, {"id" : "b", "amount" : 2}]  
  request_date: { type: Date, require: true },
  expected_return_date: { type: Date, require: true },
  actual_return_date: { type: Date, require: true },
  pickup_date: { type: Date, require: true },
  borrower_id: { type: String, require: true },
  lecturer_id: { type: String },
  student_status: { type: String, require: true }, //include (waiting, ready, picked up, returned, canceled),
  lecturer_status: { type: String, require: true }, //include (pending, approved, canceled),
  technician_status: { type: String, require: true }, //include (waiting ,pending, approved, canceled)
  note: {type: String},
});

module.exports = mongoose.model("request", requestSchema);
