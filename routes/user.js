const express = require('express'); //import the express module
const usersController = require('../controllers/users_controller'); //import the users controller
const passport = require('passport'); //import the passport module

const router = express.Router();

// route the requests
router.get('/sign-up', usersController.signUp); //route the request to signUp action of users_controller
router.post('/create', usersController.create); //route the request to create action of users_controller
router.post('/create-session', passport.authenticate(
    'local', //use passport-local strategy
    {failureRedirect: '/'},
), usersController.createSession); //route the request to createSession action of users_controller
router.get('/sign-out', usersController.destroySession); //route the request to destroySession action of users_controller

// export the router
module.exports = router;