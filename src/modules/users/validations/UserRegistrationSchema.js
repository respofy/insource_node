import Joi from 'joi'

const UserRegistrationSchema = {
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
	}
}

export default UserRegistrationSchema
