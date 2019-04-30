import Joi from '@hapi/joi'

const AuthResendSMSSchema = {
	body: {
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
			.length(9)
			.required()
	}
}

export default AuthResendSMSSchema
