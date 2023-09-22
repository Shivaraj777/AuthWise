// imports
const express = require('express'); //import the express module
const forgotPasswordController = require('../controllers/forgotPassword_controller'); //import the forgotPassword_controller module

const router = express.Router();

// routes for forgot password
router.get('/find-user', forgotPasswordController.forgotPassword); //route the request to forgotPassword action of forgotPassword_controller
router.post('/generate-access-token', forgotPasswordController.generateAccessToken); //route the request to generateAccessToken action of forgotPassword_controller
router.get('/reset/:accessToken', forgotPasswordController.displayResetPasswordPage); //route the request to displayResetPasswordPage action of forgotPassword_controller

// export the router
module.exports = router;