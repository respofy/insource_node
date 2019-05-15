import Joi from '@hapi/joi'

const UserSetProfileSchema = {
	body: {
		name: Joi.string().min(2),
		surname: Joi.string().min(2),
		birthday: Joi.date(),
		gender: Joi.string().valid(['male', 'female']),
		city_id: Joi.number().integer(),
		status_id: Joi.number().integer(),
		incognito: Joi.any().valid(['0', '1']),
		about_me: Joi.string()
			.trim()
			.max(400)
	}
}

export default UserSetProfileSchema
