// Description: This file contains the configuration setup for environment in which app runs

// setup development environment
const development = {
    name: 'development',
    session_cookie_key: 'RandomGenerator',
    smtp: {
        service: 'gmail',                //service to be used for sending emails
        host: 'smtp.gmail.com',         //domain used by developers to interact with service    
        port: 587,
        secure: true,  
        auth: {         
            user: process.env.GMAIL_USERNAME,
            pass: process.env.AUTHWISE_GMAIL_PASSWORD
        }
    },
    google_client_ID: process.env.AUTHWISE_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.AUTHWISE_GOOGLE_CLIENT_SECRET,
    google_callback_URL: process.env.AUTHWISE_GOOGLE_CALLBACK_URL
}

// export the module
module.exports = eval(process.env.NODE_ENVIRONMENT) === undefined ? development : eval(process.env.NODE_ENVIRONMENT); 