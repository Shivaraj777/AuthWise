// Description: This file contains the actions related to forgot password scenario

// action to render forgot password page
module.exports.forgotPassword = function(req, res){
    return res.render('forgot_password', {
        title: 'Forgot Password page'
    });
}