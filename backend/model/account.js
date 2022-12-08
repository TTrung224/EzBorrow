const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  last_name: { type: String, default: null },
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
  token: { type: String },
  type: { type: String, require: true}, // (lecturer / student / technician)
  fine: {type: String, enum: ['NONE', 'LATE RETURN', 'BREAK_ITEM'], default: 'NONE'}, // decide the fine code: hasn't returned, damaged components
  fineDescription: {type: String, default: 'NONE'}
});

module.exports = mongoose.model("account", accountSchema);
