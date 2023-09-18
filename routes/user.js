const express = require('express'); //import the express module
const usersController = require('../controllers/users_controller'); //import the users controller

const router = express.Router();

// route the requests
router.get('/sign-up', usersController.signUp); //route the request to signUp action of users_controller

// export the router
module.exports = router;