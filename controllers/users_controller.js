// This file contains the actions related to user

// action to render sign-up page
module.exports.signUp = function(req, res){
    return res.render('sign_up', {
        title: 'Sign Up page'
    });
}