const passport=require('passport');
const GoogleStrategy=require('passport-google-oauth').OAuth2Strategy;
const User=require('../models/user');
const crpto=require('crypto');
const env=require('./environment')


passport.use(new GoogleStrategy({
    clientID: env.google_client_id,
    clientSecret:env.google_client_secret,
    callbackURL: env.google_callback_url
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