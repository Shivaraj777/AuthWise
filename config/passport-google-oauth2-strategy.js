//Description: This file contains the code for google-oauth strategy of passport

// imports
const passport = require('passport'); //importing the passport module
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //importing the passport-google-oauth2 module and extract the GoogleStrategy
const crypto = require('crypto'); //importing the crypto module
const User = require('../models/user'); //importing the user model
const env = require('./environment'); //import the environment module

//tell passport to use the google strategy(for logging in using google)
passport.use(new GoogleStrategy({
        //options for the google strategy
        clientID: env.google_client_ID,
        clientSecret: env.google_client_secret,
        callbackURL: env.google_callback_URL
    },
    function(accessToken, refreshToken, profile, done){     //callback function to be executed after the user is authenticated(accessToken=>access token for the user provided by google and is similar to jwt token, refreshToken=>used to generate new access token when it expires, profile=>contains the information of the user)
        //find the user
        User.findOne({email: profile.emails[0].value}).exec()
            .then(user => {
                // console.log(profile);

                //if user is found set the user as req.user
                if(user){
                    return done(null, user);    //null -> no error, user -> authentication success
                }else{
                    //if the user is not found then create the user and set the user as req.user
                    User.create({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: crypto.randomBytes(20).toString('hex')  //generating a random password
                    })
                        .then(user => {
                            return done(null, user);
                        })
                        .catch(err => {
                            console.log('***Error in google strategy-passport***Creating user:', err);
                            return;
                        });
                }
            })
            .catch(err => {
                console.log('***Error in google strategy-passport***Findng user:', err);
                return;
            });
    }
));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done){
    //setting the user id as key in the cookies
    done(null, user.id);
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done){
    //finding the user using the id
    User.findById(id)
        .then(user => {
            //if user found
            if(user){
                return done(null, user); 
            }
            //if user not found
            return done(null, false);
        })
        .catch(err => {
            console.log(`Error in finding user --> Passport`);
            return done(err);
        });
});

//export the passport module
module.exports = passport;