const mongoose=require('mongoose');
const env=require('./environment')
mongoose.set('strictQuery', false)
mongoose.connect(env.db);
const db=mongoose.connection;
db.on('error', console.error.bind(console, "error in connecting db"));

db.once("open", ()=>{
   console.log(env.db)
   console.log("database connected successfully")
})







module.exports=db;