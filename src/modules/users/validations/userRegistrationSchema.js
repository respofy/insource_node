import Joi from 'joi'

const userRegistrationSchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required(),
		name: Joi.string()
			.min(2)
			.required(),
		surname: Joi.string()
			.min(2)
			.required(),
		password: Joi.string()
			.min(6)
			.required()
		// avatar:  Joi.string().uri().min(6).required(),
		// birthday: Joi.date(),
		// about_me: Joi.string().max(150),
		// active: Joi.number().integer(),
		// sleep: Joi.number().integer(),
		// email: Joi.string().email()
	}
}

export default userRegistrationSchema
