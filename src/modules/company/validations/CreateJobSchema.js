import Joi from '@hapi/joi'

const CreateJobSchema = {
	body: {
		working_type_id: Joi.number()
			.integer()
			.required(),
		city_id: Joi.number()
			.integer()
			.required(),
		role_id: Joi.number()
			.integer()
			.required(),
		profession_id: Joi.number()
			.integer()
			.required(),
		degree_id: Joi.number()
			.integer()
			.required(),
		language_id: Joi.number()
			.integer()
			.required(),
		language_knowledge_id: Joi.number()
			.integer()
			.required(),
		title: Joi.string()
			.min(5)
			.max(140)
			.trim()
			.required(),
		salary_from: Joi.number()
			.integer()
			.required(),
		salary_to: Joi.number()
			.integer()
			.greater(Joi.ref('salary_from'))
			.required(),
		experience_from: Joi.number()
			.integer()
			.required(),
		experience_to: Joi.number()
			.integer()
			.greater(Joi.ref('experience_from'))
			.required(),
		description: Joi.string()
			.max(400)
			.trim()
			.required()
	}
}

export default CreateJobSchema
