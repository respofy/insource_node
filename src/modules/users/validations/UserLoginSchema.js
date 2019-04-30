import Joi from '@hapi/joi'

const UserLoginSchema = {
	body: {
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
			.length(9)
			.required(),
		password: Joi.string()
			.min(6)
			.required()
	}
}

export default UserLoginSchema
