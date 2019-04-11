import Joi from 'joi'

const UserEducationUpdateSchema = {
	body: {
		started_at: Joi.date(),
		finished_at: Joi.date().min(Joi.ref('started_at')),
		user_id: Joi.number(),
		profession_id: Joi.number(),
		degree_id: Joi.number(),
		university_id: Joi.number(),
		faculty_id: Joi.number()
	}
}

export default UserEducationUpdateSchema
