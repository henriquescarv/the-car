const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Car = new Schema({
  placa: {
    type: String,
    required: [true, "Placa obrigatório"],
    unique: true,
  },
  ano: {
    type: Number,
    required: [true, "Ano obrigatório"],
  },
  modelo: {
    type: String,
    required: [true, "Modelo obrigatório"],
  },
  aluguel: {
    type: Number,
    required: [true, "Valor de aluguel obrigatório"],
  },
});

module.exports = mongoose.model("Car", Car);
