import Joi from '@hapi/joi'

const UserFillDataSchema = {
	body: {
		// phone
		phone: Joi.string()
			.regex(/^[0-9]+$/, 'phone')
			.length(9)
			.required(),
		// password
		password: Joi.string()
			.min(6)
			.required(),
		// name
		name: Joi.string()
			.min(2)
			.required(),
		// surname
		surname: Joi.string()
			.min(2)
			.required(),
		// gender
		gender: Joi.string()
			.valid('male', 'female')
			.required(),
		// birth day
		birthday: Joi.date().required(),
		// about me
		city_id: Joi.number()
			.integer()
			.required()
	}
}

export default UserFillDataSchema
