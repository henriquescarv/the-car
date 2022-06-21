const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reserve = new Schema({
  person_id: Schema.Types.ObjectId,
  car_id: Schema.Types.ObjectId,
  period: Number,
});

module.exports = mongoose.model("Reserve", Reserve);
