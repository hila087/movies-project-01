const Joi = require('joi')


/**
 * Validation schema for User Login operation.
 */
module.exports = Joi.object({
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),

    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required()
})