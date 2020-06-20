const mongoose= require('mongoose')
const schemas=require('./schema')

// destructing schemas
const {userSchema, blogSchema}= schemas

// user model
const User= mongoose.model('User', userSchema)

// blog model
const Blog = mongoose.model('Blog', blogSchema)


module.exports={
    User: User,
    Blog: Blog
}