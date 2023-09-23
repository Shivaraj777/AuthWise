// Description: This file contains the configuration setup for environment in which app runs

// setup development environment
const development = {
    name: 'development',
    session_cookie_key: 'RandomGenerator',
    mongo_CONNECT_URL: 'mongodb://127.0.0.1/AuthWise_app',
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
    google_callback_URL: process.env.AUTHWISE_GOOGLE_CALLBACK_URL,
    google_captcha_site_key: process.env.CAPTCHA_SITE_KEY,
    google_capthca_secret_key: process.env.CAPTCHA_SECRET_KEY
}

// setup production environment
const production = {
    name: 'production',
    session_cookie_key: 'RandomGenerator',
    mongo_CONNECT_URL: process.env.MONGODB_ATLAS_URL,
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
    google_callback_URL: process.env.AUTHWISE_GOOGLE_CALLBACK_URL,
    google_captcha_site_key: process.env.CAPTCHA_SITE_KEY,
    google_capthca_secret_key: process.env.CAPTCHA_SECRET_KEY,
    redisHost: process.env.REDIS_HOST,
    redisPort: process.env.REDIS_PORT
}

// export the module
module.exports = eval(process.env.NODE_ENVIRONMENT) === undefined ? development : eval(process.env.NODE_ENVIRONMENT); 