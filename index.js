// imports
const express = require('express'); //import the express module
const expressLayouts = require('express-ejs-layouts'); //import the express layouts module
const db = require('./config/mongoose'); //import the mongoose config module
const cookieParser = require('cookie-parser'); //import cookie parser module
const passport = require('passport'); //import the passport module
const passportLocal = require('./config/passport_local_strategy'); //import the passport_local_strategy config module
const passportGoogle = require('./config/passport-google-oauth2-strategy'); //import the passport google-oauth2 strategy module
const session = require('express-session'); //import express session module
const MongoStore = require('connect-mongo'); //import the connect-mongo module
const flash = require('connect-flash'); //import the connect-flash module
const customMware = require('./config/middleware'); //import the custom middleware module

const app = express(); //create the express app
const port = 8000; //define the port

// set ejs as view engine
app.set('view engine', 'ejs');
app.set('views', './views'); //set the path for the views folder

// extract the styles and scripts from the sub-pages to the layout
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

// middleware to parse form data
app.use(express.urlencoded({extended:true}));

// middleware to read and write into cookies
app.use(cookieParser());

// middleware to access the static files
app.use(express.static('./assets'));

// middleware to use express layouts
app.use(expressLayouts);

//use express session to maintain the session cookies
app.use(session({
    name: 'AuthWise', //name of the session cookie
    secret: 'randomGenerator', //secret key used to encrypt the session cookie
    saveUninitialized: false,  // if the user is not logged in, do not save the session cookie
    resave: false,   //if the session is not modified, do not save it
    cookie: {
        maxAge: (1000 * 60 * 100)  //max time in milliseconds after which the session cookie expires
    },
    store: new MongoStore(
        {
            mongoUrl: 'mongodb://127.0.0.1/AuthWise_app',  //connecting to the database
            autoRemove: 'disabled'  //do not remove the session from the database even if it expires
        },
        function(err){
            console.log(err || 'connect-mongodb setup ok');
        }
    )
}));

//middleware to intialize and maintain the user session
app.use(passport.initialize());
app.use(passport.session());

//middleware to set user data in views
app.use(passport.setAuthenticatedUser);

// middleware to display flash messages
app.use(flash());
app.use(customMware.setFlash); //set the flash messages in response locals

// middleware to route the requests
app.use('/', require('./routes'));

// listen on the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
        return;
    }
    
    console.log(`Server is running on port: ${port}`);
});