const express= require('express')
const bodyParser= require('body-parser')
const helmet= require('helmet')
const mongoose= require('mongoose')
const bcrypt= require('bcrypt')
const jwt= require('jsonwebtoken')
const models= require('../models')
const config= require('config')

const auth= express.Router()

// destructuring models 
const {User}= models

auth.use(bodyParser.json())
auth.use(bodyParser.urlencoded({extended: true}))
auth.use(helmet())

mongoConnection= 'mongodb://localhost/counsellor_portal'
mongoose.connect(mongoConnection,{useNewUrlParser: true})

// endpoints

auth.get('/',(req,res)=>{
    res.send("Login form will be displayed")
})

auth.post('/login',async (req,res)=>{

    var user= await User.findOne({username: req.body.username })
    if(!user) return res.send("no user with this username was found try again or create a new user")
    else{
        const valid= await bcrypt.compare(req.body.password, user.password)
        if(! valid) return res.send("wrong password")
        else{
            const token= jwt.sign({
                _id: user._id,
                isCounsellor: user.isCounsellor
            }, config.get('jwtPrivateKey'))
            res.send(token)
        }
    }
    
})

module.exports =auth