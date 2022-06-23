const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Reserve = new Schema({
  person_id: {
    type: Schema.Types.ObjectId,
    ref: "Person",
    required: [true, "Pessoa é obrigatório"],
  },
  car_id: {
    type: Schema.Types.ObjectId,
    ref: "Car",
    required: [true, "Carro é obrigatório"],
  },
  period: { type: Number, required: [true, "Período é obrigatório"] },
});

module.exports = mongoose.model("Reserve", Reserve);
