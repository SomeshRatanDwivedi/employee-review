const express=require('express');
const router=express.Router();
const passport=require('../config/passport-local')
const adminController=require('../controllers/admin-controller')


router.get('/assign-work', passport.checkAuthentication, adminController.assignWork);
router.get('/employees', passport.checkAuthentication, adminController.showEmployees);
router.get('/register', passport.checkAuthentication, adminController.adminRegister);
router.post('/make-admin', passport.checkAuthentication,adminController.makeAdmin);
router.get('/delete-employee/:id', passport.checkAuthentication, adminController.deleteEmployee);
router.get('/update-employee/:id', passport.checkAuthentication, adminController.showUpdateEmployeePage);
router.post('/update-user/:id', passport.checkAuthentication, adminController.updateUser);
router.post('/register-new-employee', adminController.registerNewEmployee);














module.exports=router