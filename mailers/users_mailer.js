// Description: This file conatins functionality to send emails to the user when any action related to user is performed

// imports
const nodemailer = require('../config/nodemailer'); //import the nodemailer config
const env = require('../config/environment'); //import the environment config

// function to send email to the user on signing up
exports.registration = (user) => {
    console.log('Inside Registration mailer');

    // render html template for the mail
    let htmlString = nodemailer.renderTemplate({user: user}, '/users/registration.ejs');

    // send the email
    nodemailer.transporter.sendMail({
        from: env.smtp.auth.user,
        to: user.email,
        subject: 'User Registration successful',
        html: htmlString
    },
    (err, info) => {
        if(err){
            console.log(`Error in sending email: ${err}`);
            return;
        }

        console.log(`Mail sent successfully: ${info}`);
    });
}