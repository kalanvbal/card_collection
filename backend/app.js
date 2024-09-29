const express = require("express");
require("dotenv").config();
const carteRoutes = require("./routes/cartes");
const userRoutes = require("./routes/users");
const mongoose = require("mongoose");
const cors = require("cors");

//app express
const app = express();

//middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  next();
});

//routes
app.use("/api/cartes", carteRoutes);
app.use("/api/users", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI || "mongodb://localhost:27017/db/-deploy")
  .then(() => {
    //ecouter requetes
    app.listen(process.env.PORT, () => {
      console.log("connecte a la db & port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
