const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  component_list: { type: Array, require: true }, //[{"id" : "a", "name" : "abc", "amount" : 1}, {"id" : "b", "name" : "bcd", "amount" : 2}]  
  expected_return_date: { type: Date, require: true },
  actual_return_date: { type: Date, require: true },
  pickup_date: { type: Date, require: true },
  borrower_email: { type: String, require: true },
  lecturer_email: { type: String, require: true },
  student_status: { type: String, enum : ['waiting', 'ready', 'picked up', 'returned', 'canceled'], require: true }, //include (waiting, ready, picked up, returned, canceled),
  lecturer_status: { type: String, enum : ['pending', 'approved', 'canceled'], require: true }, //include (pending, approved, canceled),
  technician_status: { type: String, enum : ['waiting', 'pending', 'approved', 'canceled'], require: true }, //include (waiting ,pending, approved, canceled)
  note: {type: String},
  course: {type: String, require: true },
  createdAt: { type: Date},
  }, {
    timestamps: true,
  }
);

module.exports = mongoose.model("request", requestSchema);
