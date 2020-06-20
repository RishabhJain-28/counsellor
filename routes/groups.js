const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const models= require('../models')
const authmdw= require('../middleware/authmdw')

const group= express.Router()

group.use(bodyParser.json())

mongoConnection= 'mongodb://localhost/counsellor_portal'
mongoose.connect(mongoConnection,{useNewUrlParser: true})

function checkRights(req,res,next){
    if(req.user.isCounsellor) next()
    else return res.status(403).send("You are forbidden to access this endpoint")   
}

const {Group}= models
group.get('/',[authmdw, checkRights],(req,res)=>{
    res.send("you can create groups of up to 4 members")
})

group.post('/create',[authmdw, checkRights],async (req,res)=>{
    var grp= new Group(req.body)
    var newGroup= await grp.save()
    res.send(newGroup)
})

module.exports= group