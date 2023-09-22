// Description: This file contains the schema for reset Password tokens

// import the mongoose module
const mongoose = require('mongoose');

// create the reset Password token schema
const resetPasswordTokenSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    } ,
    accessToken: {
        type: String,
        required: true
    },
    isValid: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
});

// create the model for reset Password tokens
const ResetPasswordToken = mongoose.model('ResetPasswordToken', resetPasswordTokenSchema);

// export the model
module.exports = ResetPasswordToken;