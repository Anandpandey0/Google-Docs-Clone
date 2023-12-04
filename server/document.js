const { schema, model, Schema } = require("mongoose");
const Document = new Schema({
  _id: String,
  data: Object,
  creator: String,
});

module.exports = model("Document", Document);
