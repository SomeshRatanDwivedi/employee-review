const mongoose=require('mongoose');
const multer=require('multer');
const path = require('path');
const AVTAR_PATH=path.join('/uploads/avtars');


const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    avtar:{
        type:String
    },
    reviewTo:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Review'
    },
    reviewFrom:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'Review'
    }
},
{
    timestamps:true
})




const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '..', AVTAR_PATH))
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })


userSchema.statics.uploadedAvtar=multer({storage:storage}).single('avtar');
userSchema.statics.avtarPath=AVTAR_PATH;

const User=mongoose.model('User', userSchema);


module.exports=User;