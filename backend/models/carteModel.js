const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const carteSchema = new Schema(
  {
    nom: {
      type: String,
      required: true,
    },
    vie: {
      type: Number,
      required: true,
    },

    element: {
      type: String,
      requried: true,
    },

    type_attack: {
      description: {
        type: String,
        required: true,
      },
      attack: {
        type: Number,
        required: true,
      },
    },
    type_attack2: {
      description: {
        type: String,
        required: true,
      },
      attack: {
        type: String,
        required: true,
      },
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Carte", carteSchema);
