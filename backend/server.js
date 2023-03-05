const express=require('express');
const app=express();
const cors=require('cors');
app.use(cors());
const connectDB=()=>require('./db');
const mongoose=require("mongoose");
const Workout=require('./WorkoutSchema');
const DayStructure=require('./DayStructure');
const Exercise=require('./Exercises');
var bodyParser = require('body-parser');
const { findById, findOne } = require('./WorkoutSchema');
app.use(bodyParser.json());
app.use(express.json());
connectDB();

app.get('/:id',(req,res)=>{
  let arr=[];
Workout.find({"days":req.params.id})
  .then(doc => {  
    doc[0].Workout_scheme.map(e=>{DayStructure.find({"_id":e}).then(doc=>arr.push(doc[0].name))});
    setTimeout( function sayhello(arr){
      res.json(arr);
    },100,arr);
    
  })
  .catch(err => {
    console.log(err);
  });
  
})
app.get('/daystructure/:id',(req,res)=>{
   
  DayStructure.find({"id":req.params.id})
    .then(doc => {
      
      console.log(doc);
      res.json(doc);
    })
    .catch(err => {
      console.log(err);
    });
    
    
  })
  app.get('/exercise/:id',(req,res)=>{
   
    let arr=[];
DayStructure.find({"name":req.params.id})
  .then(doc => {  
    doc[0].exercises.map(e=>{Exercise.find({"_id":e}).then(doc=>arr.push(doc[0].name))});
    setTimeout( function sayhello(arr){
      res.json(arr);
    },100,arr);
    
  })
  .catch(err => {
    console.log(err);
  });
      
      
    })
  
app.post('/',(req,res)=>{
 let newWorkout=new Workout(req.body);
console.log(newWorkout);
newWorkout.save()

.then(todo => {
    console.log('Workout added');
})
.catch(err => {
    console.log('unable to add');
});
})
app.post('/daystructure',(req,res)=>{
  let newplan=new DayStructure({
    _id:req.body._id,
    name: req.body.name,
    exercises: mongoose.ObjectId.cast(req.body.exercises)
  });
  
 console.log(newplan);
 newplan.save()
 
 .then(todo => {
     console.log('Day plan added');
 })
 .catch(err => {
     console.log('unable to add');
 });
 })
 app.post('/exercise',(req,res)=>{
  let newplan=new Exercise(req.body);
 console.log(newplan);
 newplan.save()
 
 .then(todo => {
     console.log('Exercise added');
 })
 .catch(err => {
     console.log('unable to add');
 });
 })
const port=4000;
app.listen(port ,console.log(`server started on port ${port}`));