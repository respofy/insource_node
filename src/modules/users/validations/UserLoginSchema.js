import Joi from 'joi'

const UserLoginSchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required(),
		password: Joi.string()
			.min(6)
			.required()
	}
}

export default UserLoginSchema
