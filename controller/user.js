const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config();
const User = require('../models/user-details')


exports.addUser = async (req, res, next) => {
    try {
        const name = req.body.Name;
        const email = req.body.Email;
        const phone = req.body.Phone;
        const password = req.body.Password;
        const address = req.body.Address;
        const pincode = req.body.Pincode;
        //console.log(name, email, phone, address, pincode)

        const saltrounds = 10;
        bcrypt.hash(password, saltrounds, async (err, hash) => {
            //console.log(err);
            const user = await User.create({
                name: name,
                email: email,
                password: hash,
                phonenumber: phone,
                Address: address,
                Pincode: pincode
            })
            res.status(200).json(user)
        })

    } catch (err) {
        res.status(500).json(err)
    }
}


const generatetoken=({id,name,email})=>{
    return jwt.sign({id,name,email},process.env.JWT_STRING)
}


exports.loginUser = async (req, res, next) => {
    try {
        const email = req.body.email;
        const password = req.body.password;

        const user = await User.findOne({ email: email });
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (err) {
                    return res.status(400).json({ user: user });
                }
                if (result === true) {
                    res.status(201).json({token:generatetoken(user)});
                }
                if (result === false) {
                    return res.status(200).json({ "message": "Please Check your Password" });
                }
            })
        } else {
            throw new Error('Please Check your email')
        }
    } catch (err) {
        res.status(500).json(err)
    }
}