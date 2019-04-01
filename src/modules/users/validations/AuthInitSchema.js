import Joi from 'joi'

const AuthInitSchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required(),
		password: Joi.string()
			.min(6)
			.required(),
		c_password: Joi.string()
			.min(6)
			.required()
	}
}

export default AuthInitSchema
