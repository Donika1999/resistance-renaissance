const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Muscle = new Schema(
  {
    _id: String,
   name:String
  }
);

module.exports = mongoose.model("Muscles", Muscle);