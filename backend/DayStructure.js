const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let DayStructure = new Schema(
  {
    _id: String,
   name:String,
   exercises: Array
    
  }
);

module.exports = mongoose.model("Day Structure", DayStructure);