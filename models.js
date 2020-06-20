const mongoose= require('mongoose')
const schemas=require('./schema')

// destructing schemas
const {userSchema}= schemas

// user model
const User= mongoose.model('User', userSchema)



module.exports={
    User: User
}