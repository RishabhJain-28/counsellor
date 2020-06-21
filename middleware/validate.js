const joi= require('joi')


const appointmentSchema= joi.object().keys({
    slotId: joi.string().min(23).required(),
    onDate: joi.date().iso().required(),
    from: joi.string().regex(/[0-23]:[0-59]/).required(),
    to: joi.string().regex(/[0-23]:[0-59]/).required(),
    memberUsername: joi.string().min(3).required(),
    memberId: joi.string().min(23).required(),
    counsellorName:joi.string().min(3).required(),
    message: joi.any()
})

const userSchema= joi.object().keys({
    username: joi.string().min(3).max(10).required(),
    password: joi.string().min(6).max(20).required(),
    isCounsellor: joi.boolean().default(false)
})

function validateUser(req, res, next){
    joi.validate(JSON.stringify(req.body), userSchema, (err, value)=>{
        if(err) return res.status(422).send(`${err}`)
        next()
    })
    
}
function validateAppointment(req, res, next){
    joi.validate(req.body, appointmentSchema, (err, value)=>{
        if(err) return res.status(422).send(`${err}`)
        next()
    })
    
}

module.exports={
    validateUser: validateUser,
    validateAppointment: validateAppointment
}