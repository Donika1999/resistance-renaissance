const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let Exercises = new Schema(
  {
    _id: String,
   name:String,
   muscles:Array,
    Description: String,
   youtube_link: String
    
  }
);

module.exports = mongoose.model("Exercises", Exercises);