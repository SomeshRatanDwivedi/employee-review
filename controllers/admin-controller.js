const User=require('../models/user')
const Review=require('../models/review');
const fs=require('fs');
const path=require('path')

module.exports.assignWork=(req, res)=>{
    User.find({}, (err, users)=>{
        if(err){
            console.log("err in assignWork", err);
            return;
        }
        return res.render('_employee_profile', {
            page:"_employee_profile",
            user:req.user,
            adminPage:'_assign_work',
            employees:users

        })
    })
      
}


module.exports.showEmployees=(req, res)=>{
    User.find({}, (err, users)=>{
        if(err){
            console.log("err in assignWork", err);
            return;
        }
        return res.render('_employee_profile', {
            page:"_employee_profile",
            user:req.user,
            adminPage:'_show_all_employees',
            employees:users
        })
    })

    
}


module.exports.adminRegister=(req, res)=>{
    User.find({}, (err, users)=>{
        if(err){
            console.log("err in assignWork", err);
            return;
        }
        return res.render('_employee_profile', {
            page:"_employee_profile",
            user:req.user,
            adminPage:'_admin_register',
            employees:users
        })
    })
      
}


module.exports.makeAdmin=async(req, res)=>{
    try{
        let user=await User.findById(req.body.id)
        user.isAdmin=true;
        user.save();
      
        return res.redirect('back')

    }catch(err){
        console.log("err in makeAdmin", err);
        return;
    }
  
}


module.exports.deleteEmployee=async(req, res)=>{
    try{
        let user=await User.findById(req.params.id);
        const imagePath=path.join(__dirname, '..', user.avtar);
        fs.unlinkSync(imagePath);
        user.remove();

    }catch(err){
        console.log("err in deleting employee", err);
        return;

    }

     User.deleteOne({_id:req.params.id}, (err)=>{
        if(err){
           
        }
        return res.redirect("back");
     })
}


module.exports.showUpdateEmployeePage=(req, res)=>{
    User.findById(req.params.id).populate('reviewTo').populate('reviewFrom').exec((err, user)=>{
        if(err){
            console.log("err in deleting employee", err);
            return;
        }
        return res.render('_employee_profile', {
            page:"_employee_profile",
            user:req.user,
            adminPage:'_update_user',
            selectedUser:user
        })

    })

}


module.exports.updateUser=(req, res)=>{
    User.uploadedAvtar(req, res, async(err)=>{
        try{
            let user=await User.findById(req.params.id);
            if(req.body.name){
                user.name=req.body.name;
            }
            if(req.file){
                const imagePath=path.join(__dirname, '..', user.avtar);
                fs.unlinkSync(imagePath);
                user.avtar=User.avtarPath+'/'+req.file.filename
            }
            user.save();
            res.redirect("back");

        }catch(err){
            console.log("err in updating user", err);
            return;

        }

    })
}


module.exports.registerNewEmployee=async(req, res)=>{
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
        console.log("err in registring user by admin", err);
        return;
    }

}