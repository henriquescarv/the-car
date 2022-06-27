const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Payment = new Schema({
  price: {
    type: Number,
    required: [true, "Preço é obrigatório."],
  },

  credit_card: {
    type: String,
    required: [true, "Cartão é obrigatório."],
  },

  reserva_id: {
    type: Schema.Types.ObjectId,
    ref: "Reserve",
    required: [true, "Reserva é obrigatório"],
  },

  definitive: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("Payment", Payment);
