const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const models= require('../models')
const authmdw= require('../middleware/authmdw')

const slot= express.Router()

slot.use(bodyParser.json())

mongoConnection= 'mongodb://localhost/counsellor_portal'
mongoose.connect(mongoConnection,{useNewUrlParser: true})

function checkRights(req,res,next){
    if(req.user.isCounsellor) next()
    else return res.status(403).send("You are forbidden to access this endpoint")   
}

const {Slot}= models
slot.get('/',[authmdw, checkRights],(req,res)=>{
    res.send("you can create slots of up to 4 members")
})

slot.post('/create',[authmdw, checkRights],async (req,res)=>{
    var slt= new Slot(req.body)
    var newSlot= await slt.save()
    res.send(newSlot)
})

module.exports= slot