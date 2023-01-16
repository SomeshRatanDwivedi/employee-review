const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const User=require('../models/user');
const crpto=require('crypto');


passport.use(new GoogleStrategy({
    clientID: "520516261986-dcme3ginp34rgsp95j89mdg8kb5t9mdu.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL: "http://localhost:8000/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
       User.findOne({email:profile.emails[0].value}, (err, user)=>{
        if(err){
            console.log("err in google authenication", err);
            return;
        }
        if(user){
          done(null, user)
        }
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crpto.randomBytes(20).toString('hex'),
                avtar:profile.photos[0].value
            },
            (err, user)=>{
                if(err){
                    console.log("err in creating user in google", err);
                    return;
                }
                return done(null, user)
            })

        }
       })
  }
));


module.exports=passport;