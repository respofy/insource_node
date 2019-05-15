import Joi from '@hapi/joi'

const UserSetProfileSchema = {
	body: {
		city_id: Joi.number()
			.integer()
			.required(),
		status_id: Joi.number()
			.integer()
			.required(),
		incognito: Joi.any().valid(0, 1).required(),
		about_me: Joi.string().trim().max(400).required()
	}
}

export default UserSetProfileSchema
