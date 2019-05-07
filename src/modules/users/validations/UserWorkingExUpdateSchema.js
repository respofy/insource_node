import Joi from '@hapi/joi'

const UserWorkingExUpdateSchema = {
	body: {
		company: {
			id: Joi.number()
				.integer()
				.allow(null),
			name: Joi.string().trim()
		},
		role_id: Joi.number().integer(),
		profession_id: Joi.number().integer(),
		started_at: Joi.date(),
		finished_at: Joi.date()
			.min(Joi.ref('started_at'))
			.allow(null),
		skills: Joi.array().items({
			id: Joi.number()
				.integer()
				.allow(null),
			title: Joi.string().trim()
		})
	}
}

export default UserWorkingExUpdateSchema
