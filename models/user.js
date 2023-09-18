// Description: thsi file contains the schema for user collection

// import the mongoose module
const mongoose = require('mongoose');

// create schema for user collection
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

// create model for user collection
const User = mongoose.model('User', userSchema);

// export the model
module.exports = User;