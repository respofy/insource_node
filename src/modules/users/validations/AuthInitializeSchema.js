import Joi from 'joi'
// import ka from 'lang/ka'

const AuthInitializeSchema = {
	body: {
		// phone
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone') // make sure phone is number
			.length(9) // phone number length
			.required() // phone number is required
	}
}

export default AuthInitializeSchema
