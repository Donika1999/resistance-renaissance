const mongoose=require('mongoose');
const MONGO_URL= "mongodb://0.0.0.0:27017";
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(MONGO_URL, {
        dbName: "comments",
        useNewUrlParser: true, 

        useUnifiedTopology: true 
        
      });
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit();
    }
  };
  
 module.exports=connectDB();