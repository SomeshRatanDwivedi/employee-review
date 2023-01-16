const express=require('express');
const PORT=8000;
const env=require('./config/environment')
const cookieParser=require('cookie-parser')
const bodyParser=require('body-parser')
const ejsLayouts=require('express-ejs-layouts');
const db=require('./config/mongoose')
const session=require('express-session');
const passport=require('passport')
const passportLocal=require('./config/passport-local');
const passportGoogle=require('./config/passport-google')
const MongoStore = require('connect-mongo');
const app=express();

app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static('./assets'));
app.use(ejsLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);
app.set('view engine', 'ejs');
app.set('views', './views')


app.use(session({
    name:"employee",
    secret: 'somesh',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: env.db,
    autoRemove:'disabled'
    
  }, (err)=>{
          console.log("err in Mongostore", err)
      }),
    cookie: { maxAge: 60 * 60 * 1000 } // 1 hour
  }));

app.use(passport.initialize());
app.use(passport.session());
app.use('/uploads', express.static(__dirname+'/uploads'))


app.use("/",require('./routers'))














app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`);
})