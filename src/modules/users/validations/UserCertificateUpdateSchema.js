import Joi from '@hapi/joi'

const UserEducationUpdateSchema = {
	body: {
		title: Joi.string()
			.trim()
			.min(5)
			.max(50),
		additional_information: Joi.string()
			.trim()
			.max(255),
		website: Joi.string()
			// eslint-disable-next-line no-useless-escape
			.regex(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/, 'website')
			.trim(),
		issue_date: Joi.date()
	}
}

export default UserEducationUpdateSchema
