const express= require('express')
const bodyParser= require('body-parser')
const path= require('path')
const helmet= require('helmet')
const mongoose= require('mongoose')
const register= require('./routes/register')
const auth= require('./routes/auth')
const config= require('config')
const sessions= require('client-sessions')

const PORT= process.env.PORT || 3000

const app= express()

if(! config.get("jwtPrivateKey")){
    console.log("FATAL error: jwtPrivateKey not defined ")
    process.exit(1)
}

// I'm using the same secret key here 
app.use(sessions({
    cookieName: "jwt",
    secret: config.get("jwtPrivateKey"),
    duration: 60*60*1000 // 1 hour
}))

app.use(bodyParser.json()) 
app.use(bodyParser.urlencoded({extended: true}))
app.use(helmet())
app.use(express.static(path.join(__dirname,'public')))

app.use('/register',register)
app.use('/auth',auth)

mongoConnection= 'mongodb://localhost/counsellor_portal'
mongoose.connect(mongoConnection,{useNewUrlParser: true})
    .then(()=> console.log(`connected to local database ${mongoConnection}`))
    .catch(err=> console.log(`could not connect to DB. ${err}`))

app.get('/',(req,res)=>{
    res.sendFile('index')
})



app.listen(PORT, ()=> console.log(`listening to port ${PORT}`))