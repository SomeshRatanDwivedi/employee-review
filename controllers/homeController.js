module.exports.showLoginPage=(req, res)=>{
    if(req.isAuthenticated()){
        res.redirect('/user/profile')
    }
    else{
        return res.render('_login',{
            page:"_login"
        })
    }
}

module.exports.showRegisterPage=(req, res)=>{
    if(req.isAuthenticated()){
        res.redirect('/user/profile')
    }
    else{

        return res.render('_register',{
            page:"_register"
        })
    }
}