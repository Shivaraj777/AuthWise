// Description: This file contains the code for the local strategy of passport

//import the passport module
const passport = require('passport');
//import the passport-local module and extract the LocalStrategy
const LocalStrategy = require('passport-local').Strategy;
//import the user model
const User = require('../models/user');

//authentication using passport
passport.use(new LocalStrategy({    //tell passport to use local strategy for authentication
        //defining the fields to be used for authentication
        usernameField: 'email',
    },
    function(email, password, done){   //done is a callback function which handles whether the authentication success and failure
        //find a user and establish the identity
        User.findOne({email: email})
            .then(user => {
                //if user not found or password does not match
                if(!user || user.password != password){
                    console.log(`Invalid Username/Password`);
                    return done(null, false);  //null -> no error, false -> autentication failed
                }
                //if user is found and password matches we return the user
                return done(null, user);    //null -> no error, user -> authentication success
            })
            .catch(err => {         //if there is an error in finding the user
                console.log(`Error in finding user --> Passport`);
                return done(err);
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

//exporting the passport module
module.exports = passport;