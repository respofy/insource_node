import Joi from 'joi'

const AuthResendSMSSchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required()
	}
}

export default AuthResendSMSSchema
