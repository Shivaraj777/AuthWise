//Description: this file is used to connect to the database using mongoose

//imports
const mongoose = require('mongoose');
const env = require('./environment');

//connect to mongodb database with the help of mongoose
mongoose.connect(env.mongo_CONNECT_URL);

//establish the connection to the database
const db = mongoose.connection;

//if error occurs while connecting to database
db.on('error', console.error.bind(console, 'Error connecting to MongoDB'));

//if connection is successful
db.once('open', function(){
    console.log("Successfully connected to the database");
});

//export the module
module.exports = db;