// Description: Configurationfore creating queue to execute delayed jobs

// import kue module
const kue = require('kue');
const env = require('./environment');

// create a queue
let queue;
if(env.name === 'production'){
    queue = kue.createQueue({
        redis: {
          host: env.redisHost,
          port: env.redisPort,
          //auth: redisPassword,
        }
    });
}else{
    queue = kue.createQueue();
}


// export the queue
module.exports = queue;