import Joi from '@hapi/joi'
import moment from 'moment'

const UserWorkingExCreateSchema = {
	body: {
		company: {
			id: Joi.number()
				.integer()
				.allow(null),
			name: Joi.string().required()
		},
		role_id: Joi.number()
			.integer()
			.required(),
		profession_id: Joi.number()
			.integer()
			.required(),
		started_at: Joi.date()
			.max(moment().format('YYYY-MM-DD'))
			.required(),
		finished_at: Joi.date()
			.min(Joi.ref('started_at'))
			.max(moment().format('YYYY-MM-DD'))
			.allow(null),
		skills: Joi.array().items({
			id: Joi.number()
				.integer()
				.allow(null),
			title: Joi.string().required()
		})
	}
}

export default UserWorkingExCreateSchema
