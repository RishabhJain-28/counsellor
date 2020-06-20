const express= require('express')
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const models= require('../models')
const config= require('config')
const jwt= require('jsonwebtoken')

const register= express.Router()

// destructuring models 
const {User}= models

register.use(bodyParser.json())
register.use(bodyParser.urlencoded({extended: true}))

mongoConnection= 'mongodb://localhost/counsellor_portal'
mongoose.connect(mongoConnection,{useNewUrlParser: true})

// endpoints

register.get('/',(req,res)=>{
    res.send("signup form will be displayed")
})

register.post('/create',async (req,res)=>{

    var alreadyPresent= await User.findOne({username: req.body.username })
    if(alreadyPresent) return res.send("a user with this username is already present")

    try{
        var usr= new User(req.body)
        var salt= await bcrypt.genSalt(10)
        usr.password= await bcrypt.hash(req.body.password, salt)

        var data= await usr.save()
        const token= jwt.sign({
            _id: data._id,
            isCounsellor: data.isCounsellor
        }, config.get('jwtPrivateKey'))

        newData= await User.findById(data._id).select(['-password','-__v'])
        res.header('x-auth-token',token).send(newData)
    }
    catch{
        return res.send("some error occurred while creating your account. Please try again")
    }
   
})

module.exports =register