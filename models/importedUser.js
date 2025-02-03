const mongoose = require("mongoose");

const importedUserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  number: { type: String, required: true },
  company: { type: String, required: true },
});

module.exports = mongoose.model("importedUser", importedUserSchema);
