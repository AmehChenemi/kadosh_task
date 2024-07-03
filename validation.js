const Joi = require("@hapi/joi");

exports.validateCreateUser = (req, res, next) => {
    const validateUser = Joi.object({
        email: Joi.string().email().required().messages({
            'string.empty': 'Email cannot be empty.',
            'string.email': 'Please enter a valid email address.',
            'any.required': 'Email is required.',
        }),
        name: Joi.string().trim().required().pattern(new RegExp('[A-Za-z]+(?:[\\s-][a-zA-Z]+)*$')).messages({
            'string.base': 'Name must be a string.',
            'string.empty': 'Name cannot be empty.',
            'string.pattern.base': 'Name must contain only letters, spaces, or hyphens.',
            'any.required': 'Name is required.',
        }),
    });

    const { name, email } = req.body;
    const { error } = validateUser.validate({ name, email }, { abortEarly: false });

    if (error) {
        return res.status(400).json({
            error: error.details.map(detail => detail.message),
        });
    }
    next();
};
