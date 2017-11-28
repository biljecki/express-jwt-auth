const Joi = require("joi");

module.exports = {
    validateBody: (schema) =>{
        return (req, res, next) => {
            const result = Joi.validate(req.body.user, schema, {abortEarly: false});
            
            if (result.error){
                return res.status(400).send({validationError: result.error});
            } 

            if (!req.value) {req.value = {}; }
            req.value['body'] = result.value;
            next();
        }
    },

    registrationSchema: Joi.object().keys({
        userName: Joi.string().required(),        
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
}

