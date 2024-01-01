const express=require('express')

const router=express.Router();

const usercontroller=require('../controller/user')

router.post('/add-user',usercontroller.addUser)
router.post('/login-user',usercontroller.loginUser)


module.exports=router;