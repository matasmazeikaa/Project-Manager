const Joi = require('@hapi/joi');


//Register Validation
const registerValidation = data => {
    const userValidationSchema = Joi.object({
        name: Joi.string()
            .min(6)
            .required(),
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    return userValidationSchema.validate(data);
};

const loginValidation = data => {
    const userValidationSchema = Joi.object({
        email: Joi.string()
            .min(6)
            .required()
            .email(),
        password: Joi.string()
            .min(6)
            .required()
    })
    return userValidationSchema.validate(data);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;