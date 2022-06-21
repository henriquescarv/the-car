const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Localization = new Schema({
  latitude: {
    type: String,
    required: [true, "Latitude obrigatória"],
  },
  longitude: {
    type: String,
    required: [true, "Longitude obrigatória"],
  },
  carro: {
    type:  mongoose.Schema.Types.ObjectId,
    ref: "Car",
    required: [true, "Carro é obrigatório"],
  },
});

module.exports = mongoose.model("Localization", Localization);
