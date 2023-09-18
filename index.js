// imports
const express = require('express'); //import the express module
const expressLayouts = require('express-ejs-layouts'); //import the express layouts module
const db = require('./config/mongoose'); //import the mongoose config module
const cookieParser = require('cookie-parser'); //import cookie parser module

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