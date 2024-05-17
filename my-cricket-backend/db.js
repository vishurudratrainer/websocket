const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/ws", { useNewUrlParser: true });

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Database connected successfully");
});


const playerSchema = new mongoose.Schema({
  name: String,
  country: String,
  score: Number,
});

const Player = mongoose.model("Player", playerSchema);

module.exports = Player;
