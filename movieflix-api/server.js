const express = require("express");
const app = express();
const cors = require("cors");
const userRoutes = require("./routes/UserRoutes");
const mongoose = require("mongoose");

app.use(cors());
app.use(express.json());

(async () => {
  try{
    await `mongoose.connect("mongodb://localhost:27017/movieflix")`;
    console.log("connexion réussie avec la base de donées");
  } catch (error) {
    console.log(error.message)
  }
})();



app.use("/api/user", userRoutes);




app.listen(5000, () => {
  console.log("server started on port 5000");
});
  



