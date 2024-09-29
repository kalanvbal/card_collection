const express = require("express");

const router = express.Router();

//fonction controlleur
const {
  connexionUser,
  inscrireUser,
  getUsers,
  updateUser,
} = require("../controllers/userController");

//get users
router.get("/", getUsers);

//connexion
router.post("/connexion", connexionUser);

//creer un compte
router.post("/inscription", inscrireUser);

//update un compte
router.patch("/:id", updateUser);

module.exports = router;
