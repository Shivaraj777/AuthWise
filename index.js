// imports
const express = require('express'); //import the express module

const app = express(); //create the express app
const port = 8000; //define the port


// listen on the server
app.listen(port, function(err){
    if(err){
        console.log(`Error in running the server ${err}`);
        return;
    }
    
    console.log(`Server is running on port: ${port}`);
});