import Joi from 'joi'

const UserResetPasswordSchema = {
	body: {
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
			.length(9)
			.required(),
		password: Joi.string()
			.min(6)
			.required(),
		code: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
			.length(4)
			.required()
	} 
}

export default UserResetPasswordSchema
