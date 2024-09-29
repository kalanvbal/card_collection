const express = require("express");

const {
  getCartes,
  getCarte,
  createCarte,
  deleteCarte,
  updateCarte,
} = require("../controllers/carteController");
const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

//authentification check
router.use(requireAuth);

//get cartes
router.get("/", getCartes);

//get carte
router.get("/:id", getCarte);

//post carte
router.post("/", createCarte);

//delete carte
router.delete("/:id", deleteCarte);

//update carte
router.patch("/:id", updateCarte);

module.exports = router;
