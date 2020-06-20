const mongoose= require('mongoose')

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
})

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

// appointment schema

const appointmentSchema=mongoose.Schema({
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
    groupSchema: groupSchema,
    appointmentSchema: appointmentSchema,
    memberSchema: memberSchema
}