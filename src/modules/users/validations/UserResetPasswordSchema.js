import Joi from 'joi'

const UserResetPasswordSchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required(),
		password: Joi.string()
			.min(6)
			.required(),
	}
}

export default UserResetPasswordSchema
