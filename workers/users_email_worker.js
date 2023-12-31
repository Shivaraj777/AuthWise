// Description: This file contains the code for worker service to send mails for user action

// imports
const queue = require('../config/kue'); //import the que config
const usersMailer = require('../mailers/users_mailer'); //import users_mailer module

// process the jobs in queue
queue.process('emails', function(job, done){
    // console.log(job.data.data);
    console.log(`Emails worker is processing a job: ${job.data.data}`);

    // execute the jobs
    if(job.data.subType === 'registration'){
        usersMailer.registration(job.data.data);
    }else if(job.data.subType === 'resetPassword'){
        usersMailer.resetPasswordLink(job.data.data.user, job.data.data.resetPasswordToken);
    }

    // tell the queue that job is done
    done();
});