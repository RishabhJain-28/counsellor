const mongoose= require('mongoose')
const schemas=require('./schema')

// destructing schemas
const {userSchema, groupSchema, appointmentSchema, memberSchema}= schemas

// models
const User= mongoose.model('User', userSchema)
const Group= mongoose.model('Group', groupSchema)
const Appointment= mongoose.model('Appointment', appointmentSchema)
const Member= mongoose.model('Member', memberSchema )

module.exports={
    User: User,
    Group: Group,
    Appointment: Appointment,
    Member: Member
}