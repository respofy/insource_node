import Joi from '@hapi/joi'

const UserUpdateCreateSchema = {
	body: {
		qualification_id: Joi.number().integer(),
		started_at: Joi.date(),
		finished_at: Joi.date().min(Joi.ref('started_at'))
	}
}

export default UserUpdateCreateSchema
