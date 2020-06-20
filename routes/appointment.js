const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const models= require('../models')
const authmdw= require('../middleware/authmdw')

const appointment= express.Router()

appointment.use(bodyParser.json())

mongoConnection= 'mongodb://localhost/counsellor_portal'
mongoose.connect(mongoConnection,{useNewUrlParser: true})


const {Appointment}= models
appointment.get('/',authmdw,(req,res)=>{
    res.send("create an appointment with your Therapist")
})

appointment.post('/create',authmdw ,async (req,res)=>{
    var apt= new Appointment(req.body)
    var newAppointment= await apt.save()
    res.send(newAppointment)
})

module.exports= appointment