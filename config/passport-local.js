const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User=require('../models/user')


passport.use(new LocalStrategy({
      usernameField:'email'
    },(email, password, done)=>{
    User.findOne({ email: email }, function (err, user) {
      if (err){
         return done(err); 
        }
      if (!user || user.password!=password) {
         return done(null, false); 
        }
      return done(null, user);
    });
  }
));


passport.serializeUser((user, done)=>{
  done(null, user.id);
})

passport.deserializeUser((id, done)=> {
  User.findById(id, (err, user)=> {
      done(null, user);
  });
});


passport.checkAuthentication=(req, res, next)=>{
  if(req.isAuthenticated()){
    next();
  }
  else{

    return res.redirect('/')
  }

}




module.exports=passport;