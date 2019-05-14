import Joi from '@hapi/joi'

const UserQualificationCreateSchema = {
	body: {
		qualification_id: Joi.number()
			.integer()
			.required(),
		started_at: Joi.date().required(),
		finished_at: Joi.date().min(Joi.ref('started_at'))
	}
}

export default UserQualificationCreateSchema
