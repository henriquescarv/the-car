const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Lock = new Schema({
  trava: {
    type: Boolean,
    required: [true, "Travamento obrigatório"],
  },
  reserva_id: {
    type: Schema.Types.ObjectId,
    ref: "Reserve",
    required: [true, "Reserva é obrigatório"],
  },
});

module.exports = mongoose.model("Lock", Lock);
