// imports
const express = require('express'); //import express module
const homeController = require('../controllers/home_controller'); //import the home controller

const router = express.Router(); //setup express router

console.log('Router loaded');

// route the requests
router.get('/', homeController.home); //route the request to home action of home_Controller
router.use('/user', require('./user')); //router the request to users route

// export the router
module.exports = router;
