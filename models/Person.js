const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Person = new Schema({
  nome: {
    type: String,
    required: [true, "Campo <Nome> obrigatório!"],
  },
  cpf: {
    type: String,
    required: [true, "Campo <CPF> obrigatório!"],
  },
  cnh: {
    type: String,
    required: [true, "Campo <CNH> obrigatório!"],
  },
  email: {
    type: String,
    required: [true, "Campo <Email> obrigatório!"],
  },
  contato: {
    type: Number,
    required: [true, "Campo <Contato> obrigatório!"],
  },
  cartao: {
    type: String,
    required: [true, "Campo <Cartão> obrigatório!"],
  },
});

module.exports = mongoose.model("Person", Person);
