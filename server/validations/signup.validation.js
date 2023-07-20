const Joi = require('joi')


/**
 * Validation schema for User Signup operation.
 */
module.exports = Joi.object({
    
    fname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    sname: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
        
    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),

    age: Joi.number()
        .integer()
        .min(18)
        .max(99),

    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})