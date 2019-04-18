/* eslint-disable no-useless-escape */
import Joi from 'joi'

const UserEducationCreateSchema = {
	body: {
		title: Joi.string()
			.trim()
			.required()
			.min(5)
			.max(50),
		additional_information: Joi.string()
			.trim()
			.max(255),
		website: Joi.string()
			.regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'website')
			.trim(),
		issue_date: Joi.date().required()
	}
}

export default UserEducationCreateSchema
