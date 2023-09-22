// Description: This file contains the actions related to forgot password scenario

// imports
const User = require('../models/user'); //import the User model
const RestPasswordToken = require('../models/resetPasswordToken'); //import the ResetPasswordToken model
const crypto = require('crypto'); //importing the crypto module
const queue = require('../config/kue'); //import the kue config
const usersEmailWorker = require('../workers/users_email_worker'); //import the users email worker module

// action to render forgot password page
module.exports.forgotPassword = function(req, res){
    return res.render('forgot_password', {
        title: 'Forgot Password page'
    });
}

// action to create access token for user to reset password
module.exports.generateAccessToken = async function(req, res){
    try{
        // find the user
        const user = await User.findOne({email: req.body.email});

        // if user exists create the access token
        if(user){
            const resetPasswordToken = await RestPasswordToken.create({
                user: user._id,
                accessToken: crypto.randomBytes(20).toString('hex'),
                isValid: true
            });

            // create job to send reset passsword link to user
            let jobData = {subType: 'resetPassword', data: {user, resetPasswordToken}};
            let job = queue.create('emails', jobData).save(function(err){
                if(err){
                    console.log(`Error in creating queue: ${err}`);
                    return;
                }
                console.log('Job enqueued', job.id);
            });

            req.flash('success', 'Reset Password link sent to email')
            return res.redirect('back');
        }else{
            req.flash('error', 'User does not exist, please use a valid email address');
            return res.redirect('back');
        }
    }catch(err){
        console.log(`Error: ${err}`);
        return;
    }
}