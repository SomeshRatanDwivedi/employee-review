const path = require("path");
const User=require("../models/user")

module.exports.login=(req, res)=>{
    return res.redirect('/user/profile')
}

module.exports.register=async(req, res)=>{
    try{
        User.uploadedAvtar(req, res, async(err)=>{
            if(err){
                console.log("err in multer", err);
                return;
            }
            if(req.body.password!=req.body.confirm_password){
                return res.redirect('back');
            }
            else{
                let user=await User.findOne({email:req.body.email});
                if(!user){
                    await User.create({
                        ...req.body,
                        avtar:User.avtarPath+'/'+req.file.filename
                    });
                    return res.redirect('/')
                }
                else{
                    return res.redirect('back');
                }
            }

        })

    }catch(err){
        console.log("err in registring user", err);
        return;
    }

}

module.exports.showProfile=async(req, res)=>{
    const user=await User.findById(req.user._id).populate('reviewFrom').populate('reviewTo');
    return res.render('_employee_profile', {
        page:"_employee_profile",
        user:user,
    })
};


module.exports.logout=(req, res)=>{
    req.logout((err) => {
        if (err) { return next(err); }
        return res.redirect('/');
    });
}