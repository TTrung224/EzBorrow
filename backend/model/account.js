const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  token: { type: String },
  type: { type: String, require: true} // (lecturer / student / technician)
});

module.exports = mongoose.model("account", accountSchema);
