// imports
const express = require('express'); //import the express module
const forgotPasswordController = require('../controllers/forgotPassword_controller'); //import the forgotPassword_controller module

const router = express.Router();

// routes for forgot password
router.get('/find-user', forgotPasswordController.forgotPassword); //route the request to forgotPassword action of forgotPassword_controller

// export the router
module.exports = router;