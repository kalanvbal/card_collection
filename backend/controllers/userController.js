const mongoose = require("mongoose");
const Users = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

//get Users
const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({ createdAt: -1 });
  res.status(200).json(users);
};

//login
const connexionUser = async (req, res) => {
  const { courriel, password } = req.body;

  try {
    const user = await Users.connexion(courriel, password);

    const token = createToken(user._id);

    res.status(200).json({ courriel, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
//s'inscrire
const inscrireUser = async (req, res) => {
  const { prenom, nom, courriel, password, couleur, nbCartes } = req.body;

  try {
    const user = await Users.inscription(
      prenom,
      nom,
      courriel,
      password,
      couleur,
      nbCartes
    );

    const token = createToken(user._id);

    res.status(200).json({ prenom, nom, courriel, token, couleur, nbCartes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//update Users
const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ erreur: "User introuvable" });
  }

  try {
    const user = await Users.findOneAndUpdate(
      { _id: id },
      { $set: req.body },
      { new: true }
    );

    if (!user) {
      return res.status(400).json({ erreur: "User introuvable" });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ erreur: "Erreur lors de la mise à jour de l'utilisateur" });
  }
};

module.exports = { connexionUser, inscrireUser, getUsers, updateUser };
