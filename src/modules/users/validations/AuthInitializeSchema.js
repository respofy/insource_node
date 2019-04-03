import Joi from 'joi'

const AuthInitializeSchema = {
	body: {
		// phone
		phone: Joi.string()
			.length(9)
			.required(),
		// password
		password: Joi.string()
			.min(6)
			.required(),
		// confirm
		password_confirm: Joi.valid(Joi.ref('password')).error(() => 'პაროლის დადასტურება სადასდ')
	}
}

export default AuthInitializeSchema
