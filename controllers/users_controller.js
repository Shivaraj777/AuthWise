// Description: This file contains the actions related to user

// imports
const User = require('../models/user'); //import the user model
const bcrypt = require('bcrypt'); //import bcrypt module
const saltRounds = 10; //number of rounds required for hashing

// action to render sign-up page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title: 'Sign Up page'
    });
}

// action to sign-up a user
module.exports.create = async function(req, res){
    try{
        if(req.body.password !== req.body.confirm_password){
            console.log('Password do not match');
            return res.redirect('back');
        }

        // search the user in database
        const user = await User.findOne({email: req.body.email});

        // if user does not exists, create new user
        if(!user){
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds); // hash the password

            await User.create({...req.body, password: hashedPassword});
            return res.redirect('/');
        }else{
            console.log('User already exists');
            return res.redirect('/');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return;
    }
}