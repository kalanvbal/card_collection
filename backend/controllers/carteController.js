const Carte = require("../models/carteModel");
const mongoose = require("mongoose");

//get cartes
const getCartes = async (req, res) => {
  const user_id = req.user._id;

  const cartes = await Carte.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(cartes);
};

//get carte
const getCarte = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ erreur: "Carte introuvable" });
  }
  const carte = await Carte.findById(id);

  if (!carte) {
    return res.status(404).json({ erreur: "Carte introuvable" });
  }

  res.status(200).json(carte);
};

//create carte
const createCarte = async (req, res) => {
  const { nom, vie, element, type_attack, type_attack2 } = req.body;

  // add doc a la db
  try {
    const user_id = req.user._id;
    const carte = await Carte.create({
      nom,
      vie,
      element,
      type_attack,
      type_attack2,
      user_id,
    });
    res.status(200).json(carte);
  } catch (erreur) {
    res.status(400).json({ erreur: erreur.message });
  }
};

//delete carte
const deleteCarte = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ erreur: "Carte introuvable" });
  }

  const carte = await Carte.findOneAndDelete({ _id: id });

  if (!carte) {
    return res.status(400).json({ erreur: "Carte introuvable" });
  }

  res.status(200).json(carte);
};

//update carte
const updateCarte = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ erreur: "Carte introuvable" });
  }

  const carte = await Carte.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!carte) {
    return res.status(400).json({ erreur: "Carte introuvable" });
  }

  res.status(200).json(carte);
};

module.exports = {
  getCartes,
  getCarte,
  createCarte,
  deleteCarte,
  updateCarte,
};
