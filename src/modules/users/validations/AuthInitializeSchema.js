import Joi from '@hapi/joi'
// import ka from 'lang/ka'

const AuthInitializeSchema = {
	body: {
		// phone
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
			.length(9)
			.required()
	}
}

export default AuthInitializeSchema
