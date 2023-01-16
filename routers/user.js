const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local')


const userController=require('../controllers/userController');

router.post('/login',passport.authenticate(
    'local',
    {failureRedirect:'/'}),
     userController.login);
router.post('/register', userController.register);
router.get('/profile', passport.checkAuthentication, userController.showProfile);

router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));
router.get('/auth/google/callback',passport.authenticate('google', {failureRedirect:'/', successRedirect:'/user/profile'}));
router.get('/logout',userController.logout);
router.use('/review', require('./review'));
router.use('/admin', require('./admin'))
















module.exports=router