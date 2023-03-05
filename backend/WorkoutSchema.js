const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let WorkoutPlan = new Schema(
  {
    _id: String,
   name:String,
    days: Number,

   Workout_scheme: Array
    
  }
);

module.exports = mongoose.model("Workout Plan", WorkoutPlan);