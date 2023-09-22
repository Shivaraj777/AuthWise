const express = require('express'); //import the express module
const usersController = require('../controllers/users_controller'); //import the users controller
const passport = require('passport'); //import the passport module

const router = express.Router();

// route the requests
router.get('/sign-up', usersController.signUp); //route the request to signUp action of users_controller
router.get('/profile', passport.checkAuthentication, usersController.userProfile); //route the request to userProfile action of users_controller
router.post('/create', usersController.create); //route the request to create action of users_controller
router.post('/create-session', passport.authenticate(
    'local', //use passport-local strategy
    {failureRedirect: '/'},
), usersController.createSession); //route the request to createSession action of users_controller
router.get('/sign-out', usersController.destroySession); //route the request to destroySession action of users_controller
router.post('/update-password', usersController.updatePassword); //route the request to updatePassword action of users_controller

//router for google authentication to get the user profile and email
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
//router for google callback url to create the session for user
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), usersController.createSession);

// export the router
module.exports = router;