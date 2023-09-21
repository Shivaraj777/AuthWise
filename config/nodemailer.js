// Description: This file contains the configuration for interacting with mail service using nodemailer

// imports
const nodemailer = require('nodemailer'); //import the nodemailer module
const ejs = require('ejs'); //import the ejs module
const path = require('path'); //import the path module
const env = require('./environment');

// define the transporter for sending emails
let transporter = nodemailer.createTransport({
    service: env.smtp.service,
    host: env.smtp.host,
    port: env.smtp.port,
    secure: true,
    auth: {
        user: env.smtp.auth.user,
        pass: env.smtp.auth.pass
    }
});

// render html template for the mail
let renderTemplate = (data, relativePath) => {
    let mailHTML;   //variable to store the html template
    ejs.renderFile(
        path.join(__dirname, '../views/mailers', relativePath),  //path of the html template
        data,   //data passed to the html template
        function(err, template){
            if(err){
                console.log(`Error in rendering template: ${err}`);
                return;
            }

            // store html template
            mailHTML = template;
        }
    );

    return mailHTML;
}

// export transporter and renderTemplate methods
module.exports = {
    transporter: transporter,
    renderTemplate: renderTemplate
}