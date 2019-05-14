import Joi from '@hapi/joi'
// import ka from 'lang/ka'

const AuthInitializeSchema = {
	body: {
		// phone
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
			.length(9)
			.required(),
		// password
		password: Joi.string()
			.min(3)
			.required()
	}
}

export default AuthInitializeSchema
