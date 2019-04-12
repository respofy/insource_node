import Joi from 'joi'

const UserEducationCreateSchema = {
	body: {
		started_at: Joi.date().required(),
		finished_at: Joi.date().min(Joi.ref('started_at')),
		profession_id: Joi.number().required(),
		degree_id: Joi.number().required(),
		university_id: Joi.number().required(),
		faculty_id: Joi.number().required(),
	}
}

export default UserEducationCreateSchema
