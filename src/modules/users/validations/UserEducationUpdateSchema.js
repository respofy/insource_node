import Joi from 'joi'

const UserEducationUpdateSchema = {
	body: {
		started_at: Joi.date(),
		finished_at: Joi.date().min(Joi.ref('started_at')),
		degree_id: Joi.number(),
		university_id: Joi.number(),
		faculty_id: Joi.number()
	}
}

export default UserEducationUpdateSchema
