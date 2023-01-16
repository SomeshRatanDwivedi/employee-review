const User=require('../models/user');
const Review=require('../models/review');

module.exports.createReview=async(req, res)=>{
    try{
        const reviewFromUser=await User.findById(req.body.reviewFrom);
        const reviewToUser=await User.findById(req.body.reviewTo);
        const review=await Review.create({
            constent:'',
            reviewFrom:reviewFromUser.name,
            reviewTo:reviewToUser.name
        });


        reviewFromUser.reviewTo.push(review._id);
        reviewFromUser.save();
        reviewToUser.reviewFrom.push(review._id);
        reviewToUser.save();
        return res.redirect('back')


    }catch(err){
        console.log("err in creating review", err);
        return;
    }
}

module.exports.updateReview=async(req, res)=>{
    try{
        const review=await Review.findById(req.params.id);
        review.content=req.body.content;
        review.save();
        return res.redirect('back')

    }catch(err){
        if(err){
            console.log("err in updating review", err);
            return;
        }
    }

}