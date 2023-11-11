const express = require('express');
const Router = express.Router();
const {usersCollection} = require('../schema/userSchema');
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const joi = require("joi");
require('dotenv').config();


Router.post("/register", async (req, res) => {
try {
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const {fullName, username, role} = req.body;
    await usersCollection.create({
        fullName,
        username,
        password: hashedPassword,
        role
    });
    res.status(201).send("Created Successfully");  
} catch (error) {
    console.log(error);
}                                                                                                                                                                                                                                                               res.send("Account created successfully");
});

Router.post("/login", async (req, res) => {
    try {
        const {username, password} = req.body;

        // const loginValidationSchema = joi.object({
        //     username:  joi.string(),
        //     password: joi.string().required().min(6).max(30)
        // }); 
        // const {error: validationError} = loginValidationSchema.validate({username, password});
    
        // if(validationError) return res.send(validationError);
        
        const userDetail = await usersCollection.findOne({username});
    
        if(!userDetail) return res.status(404).send("user-not-found");
    
        const doesPasswordMatch = bcrypt.compareSync(password, userDetail.password);
    
        if(!doesPasswordMatch) return res.status(400).send("invalid-credential");
    
        const {username: userName, _id, role} = userDetail;
    
        const token = jwt.sign({
            username: userName,
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


module.exports = Router ;


