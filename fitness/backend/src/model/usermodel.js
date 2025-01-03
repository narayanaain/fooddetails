const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name:{ type: String, required: true, unique: true },
  mail: { type: String, required: true, unique: true },
  password: { type: String},
});

module.exports = mongoose.model("User", userSchema);
  