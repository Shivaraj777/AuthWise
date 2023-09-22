// Description: Configurationfore creating queue to execute delayed jobs

// import kue module
const kue = require('kue');

// create a queue
const queue = kue.createQueue();

// export the queue
module.exports = queue;