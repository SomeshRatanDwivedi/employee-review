const mongoose=require('mongoose');

const reviewSchema=mongoose.Schema({
    content:{
        type:String,
    },
    reviewTo:{
        type:String,
        required:true
    },
    reviewFrom:{
        type:String,
        required:true
    }
},
{
    timestamps:true

})


const Review=mongoose.model('Review', reviewSchema);


module.exports=Review;