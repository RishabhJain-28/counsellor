const jwt= require('jsonwebtoken')
const config= require('config')

function authmdw(req, res, next){
    if(req.cookies.jwt) console.log(`jwt- cookie: ${req.cookies.jwt}`)
    
    const token= req.header('x-auth-token')
    if(! token) return res.status(401).send("Access denied! Auth token not found")

    try{
        const decodedToken= jwt.verify(token, config.get('jwtPrivateKey')) 
        req.user= decodedToken
        next()
    }
    catch(err){
        res.status(400).send('invalid token !!')
    }
}

module.exports= authmdw