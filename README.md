# AuthWise: An Authentication System

## Project Description

Create a complete authentication system which can be used as a starter code for creating any new application

## Features

- Home page: This is the root page of the application. It displays login form before signing in. And after signing in we are redirected to user's home page.
- Sign Up page: To signup the user
    - Enable re-captcha using Google reCaptcha and express-recaptcha
    - On successful sign up email is sent to the user.
- Login page: To enable the user to access the features of application.
    - Google login/signup: User is able to login/signup to AuthWise with a valid gmail address.
    - Forgot password: When user clicks on the Forgot password link, they are redirected to forgot password page. After submitting a valid email address a link to reset the password is sent via email to the user.
    - Reset password page: After clicking on the link sent via email, user is redirected to reset password page where they can reset their password. The link expires after user successfully resets the password.
- User Profile page: This page consists of basic user details and a form to update or reset the user's password after logging-in.
- Logout feature: To sign out the user from the app.

## Technology used

- Node.js
- Express.js
- Mongoose
- MongoDB
- Passport
    - Passport-local-strategy
    - Passport-google-OAuth2_strategy
- Nodemailer
- Kue
- Express-recaptcha
- EJS View Engine
- Bootstrap
- CSS

## Application/Project setup

- Clone the git repository in your local machine by using command,
    - git clone https://github.com/Shivaraj777/AuthWise.git
- Open the project code in VS code.
- Open the terminal and go to root directory of the project.
- Use command, npm install to install all the dependencies.
- Set up the environment variables in system.
- Install redis CLI and run redis server
- use "npm start" command to run the application.
- Open a new tab in any web browser and access the application using localhost:8000

## Hosting

- Hosted on: https://authwise-app.onrender.com/