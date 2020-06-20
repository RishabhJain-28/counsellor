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



module.exports={
    userSchema: userSchema
}