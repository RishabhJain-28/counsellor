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

// memberSchema

const memberSchema={
    username: {
        type: String,
        unique: true,
        required: true
    },
    description: {
        type: String,
        required: true,
        minlength: 20,
        maxlength: 300
    },
    category: {
        type: String,
        required: true
    }
    
}

// groupSchema

const groupSchema=mongoose.Schema({
    groupDescription:{
        type: String,
        required: true
    },
    members: [memberSchema],
    counsellorName: {
        type: String, 
        required: true
    }
}, {timestamps:true})

// slot schema

const slotSchema=mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    booked:{
        type: Boolean,
        default: false
    }
})


// appointment schema

const appointmentSchema=mongoose.Schema({
    slotId: {
        type: String,
        required: true
    },
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    memberUsername:{
        type: String,
        required: true
    },
    memberId:{
        type: String,
        required: true
    },
    counsellorName:{
        type: String, 
        required: true
    },
    message: String
},{timestamps: true})

module.exports={
    userSchema: userSchema,
    blogSchema: blogSchema,
    groupSchema: groupSchema,
    appointmentSchema: appointmentSchema,
    memberSchema: memberSchema,
    slotSchema: slotSchema

}