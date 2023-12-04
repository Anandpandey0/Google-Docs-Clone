const { schema, model, Schema } = require("mongoose");
const User = new Schema({
  _id: String,
  data: Object,
  creator: String,
});

module.exports = model("Document", Document);
