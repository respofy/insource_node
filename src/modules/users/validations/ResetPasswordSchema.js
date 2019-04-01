import Joi from 'joi'

const ResetPasswordSchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required(),
		password: Joi.string()
			.min(6)
			.required(),
		activationCode: Joi.string()
			.length(4)
			.required()
	}
}

export default ResetPasswordSchema
