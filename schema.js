const mongoose= require('mongoose');
const moment = require('moment');

// user schema

const userSchema=mongoose.Schema({
    username: {
            type: String,
            unique: true,
            required: true
        },
    password: {
        type: String,
        required: true
    },
    isCounsellor: {
        type: Boolean,
        default: false
    }
});

// blog schema

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {  
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        default: moment().format('ll')
    }
});


module.exports={
    userSchema: userSchema,
    blogSchema: blogSchema
}