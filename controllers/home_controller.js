// Description: This file contains the actions related to application home page

// action to render the home page
module.exports.home = function(req, res){
    return res.end('<h1>AuthWise - An Authentication App</h1>');
}