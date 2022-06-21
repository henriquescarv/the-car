const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Car = new Schema({
  // ou ('Car', {
  placa: {
    type: String,
    required: [true, "Placa obrigatório"],
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
