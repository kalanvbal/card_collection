const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  prenom: {
    type: String,
    required: true,
  },
  nom: {
    type: String,
    required: true,
  },
  courriel: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  couleur: {
    type: String,
    required: true,
  },
  nbCartes: {
    type: Number,
    required: true,
  },
});

//methode static inscription
userSchema.statics.inscription = async function (
  prenom,
  nom,
  courriel,
  password,
  couleur,
  nbCartes
) {
  if (!courriel || !password) {
    throw Error("Tous les champs doivent être remplis");
  }
  if (!validator.isEmail(courriel)) {
    throw Error("Courriel non valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error(
      "Mot de passe faible comme toi. Assurez-vous de mettre des majuscules, des minuscules et au moins un symbol"
    );
  }

  const existe = await this.findOne({ courriel });

  if (existe) {
    throw Error("Le courriel existe deja");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    prenom,
    nom,
    courriel,
    password: hash,
    couleur,
    nbCartes,
  });

  return user;
};

//methode static login
userSchema.statics.connexion = async function (courriel, password) {
  if (!courriel || !password) {
    throw Error("Tous les champs doivent être remplis");
  }

  const user = await this.findOne({ courriel });

  if (!user) {
    throw Error("Mauvais courriel");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Mauvais mot de passe");
  }

  return user;
};

module.exports = mongoose.model("Users", userSchema);
