const joi = require('@hapi/joi');

const userrigster = (data)=>{
    const post = {
        name: joi.string().min(5).required(),
        email : joi.string().min(5).required().email(),
        password: joi.string().min(5).required(),
    }
    return joi.validate(data, post)
}

const userlogin = (data)=>{
    const post = {
        email : joi.string().min(5).required().email(),
        password: joi.string().min(5).required(),
    }
    return joi.validate(data, post)
}


module.exports.userrigster = userrigster;
module.exports.userlogin = userlogin;