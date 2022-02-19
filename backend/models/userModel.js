const mongoose = require("mongoose");

const UsersModel = mongoose.model(
    "node-login",
    {
        email: {
            type: String,
            required: true,
            unique: true
        }, 
        password: {
            type: String,
            required: true
        },
        status: {
            type: String,
            default: 'user'
        },
        name: {
            type: String,
            required: true
        },
        dob: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true        
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    "users"
);

module.exports = { UsersModel };