const express = require('express');
const Router = express.Router();
const {usersCollection} = require('../schema/userSchema');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();

Router.post("/register", async (req, res) => {

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const {fullName, userName, role} = req.body;
    const user = await usersCollection.create({
        fullName,
        userName,
        password: hashedPassword,
        role
    });
    if(user) res.send("Account created successfully");
});



Router.post("/login", async (req, res) => {
    try {
        const {email, password} = req.body;

        const loginValidationSchema = joi.object({
            email:  joi.string().email(),
            password: joi.string().required().min(6).max(30)
        });
        const {error: validationError} = loginValidationSchema.validate({email, password});
        
        console.log(validationError);
    
        if(validationError) return res.send(validationError);
        
        const userDetail = await userCollection.findOne({email});
    
        if(!userDetail) return res.status(404).send("user-not-found");
    
        const doesPasswordMatch = bcrypt.compareSync(password, userDetail.password);
    
        if(!doesPasswordMatch) return res.status(400).send("invalid-credential");
    
        const {email: userEmail, _id, role} = userDetail;
    
        const token = jwt.sign({
            email: userEmail,
            userId: _id,
            role: role
        }, process.env.secret);
    
        res.json({
            message: "Sign in Successful",
            token
        });
    } catch (error) {
        console.log(error);
    }
   
});


module.exports = {
    Router
};


