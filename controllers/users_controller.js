// Description: This file contains the actions related to user

// imports
const User = require('../models/user'); //import the user model
const bcrypt = require('bcrypt'); //import bcrypt module
const saltRounds = 10; //number of rounds required for hashing

// action to render sign-up page
module.exports.signUp = function(req, res){
    // if the user is already sgned in, redirect to user-profile page
    if(req.isAuthenticated()){
        return res.redirect('/user/profile');
    }

    return res.render('sign_up', {
        title: 'Sign Up page'
    });
}

// action to render user-profile page
module.exports.userProfile = function(req, res){
    return res.render('user_profile', {
        title: 'User Profile Page'
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

//sign in and create a session for the user
module.exports.createSession = function(req, res){
    console.log('Logged in successfully');
    return res.redirect('/');
}

// destroy user session/sign-out
module.exports.destroySession = function(req, res){
    req.logout((err) =>{
        if(err){
            return next(err);
        }

        res.redirect('/');
    });
}

// action to update user password
module.exports.updatePassword = async function(req, res){
    try{
        //find the user
        const user = await User.findById(req.user.id);

        // if user exists
        if(user){
            // check if user entered accurate current password
            const doesCurrentPasswordMatch = await bcrypt.compare(req.body.current_password, req.user.password);

            // if entered current password is incorrect
            if(!doesCurrentPasswordMatch){
                console.log('Current password is not correct, Please try again');
                return res.redirect('back');
            }

            // if new password and confirm new password fields are not equal
            if(req.body.new_password !== req.body.confirm_new_password){
                console.log('New passwords does not match, please try again');
                return res.redirect('back');
            }

            // hash the new password and update
            const hashedPassword = await bcrypt.hash(req.body.new_password, saltRounds);
            await User.findByIdAndUpdate(user._id, {$set: {password: hashedPassword}}, {new: true});

            return res.redirect('back');
        }else{
            throw "User not found";
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return;
    }
}