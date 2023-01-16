const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local')

const reviewController=require('../controllers/review-controller')

router.post('/create-review', passport.checkAuthentication, reviewController.createReview);

router.post('/update-review/:id', passport.checkAuthentication, reviewController.updateReview)













module.exports=router;