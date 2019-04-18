import Joi from 'joi'

const UserRegistrationSchema = {
	body: {
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
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
	}
}

export default UserRegistrationSchema
