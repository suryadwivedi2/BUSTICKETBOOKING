require('dotenv').config();
const User=require('../models/user-details');
const jwt=require('jsonwebtoken');


exports.autheticate=async(req,res,next)=>{
    const token=req.header('Authorization');
    const user=jwt.verify(token,process.env.JWT_STRING);
    User.findById(user.id)
    .then((user)=>{
        req.user=user;
        next();
    }).catch((err)=>{
        return res.status(400).json('please check token')
    })
}