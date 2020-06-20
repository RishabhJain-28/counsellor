const mongoose= require('mongoose')
const schemas=require('./schema')


// destructing schemas
const {userSchema, groupSchema, appointmentSchema, memberSchema, slotSchema, blogSchema}= schemas

// models
const User= mongoose.model('User', userSchema)

const Blog = mongoose.model('Blog', blogSchema)   
const Group= mongoose.model('Group', groupSchema)
const Appointment= mongoose.model('Appointment', appointmentSchema)
const Member= mongoose.model('Member', memberSchema )
const Slot= mongoose.model('Slot', slotSchema)

module.exports={
    User: User,
    Group: Group,
    Appointment: Appointment,
    Member: Member,
    Slot: Slot,
    Blog: Blog

}