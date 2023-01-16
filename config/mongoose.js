const mongoose=require('mongoose');
mongoose.set('strictQuery', false)
mongoose.connect("mongodb://localhost/employee-review");
const db=mongoose.connection;
db.on('error', console.error.bind(console, "error in connecting db"));

db.once("open", ()=>{
   console.log("database connected successfully")
})







module.exports=db;