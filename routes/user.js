const express=require('express')

const router=express.Router();

const usercontroller=require('../controller/user')

router.post('/add-user')
router.post('/login-user')


module.exports=router;