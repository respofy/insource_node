import Joi from '@hapi/joi'
import ka from 'lang/ka'

const CreateJobSchema = {
	body: {
		working_type_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.working_type_required),
		city_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.city_required),
		role_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.role_required),
		skills: Joi.array()
			.items(
				Joi.number()
					.integer()
					.error(() => ka.joi.skill_valid)

				// Joi.object().keys({
				// 	id: Joi.any(),
				// 	title: Joi.string().min(3).error(() => ka.joi.skill_valid)
				// })
			)
			.required()
			.min(1)
			.error(() => ka.joi.skills_required),
		profession_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.profession_required),
		degree_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.degree_required),
		language_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.language_required),
		language_knowledge_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.language_knowledge_required),
		title: Joi.string()
			.min(5)
			.max(140)
			.trim()
			.required()
			.error(() => ka.joi.job_title),
		salary_from: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.salary_required),
		salary_to: Joi.number()
			.integer()
			.greater(Joi.ref('salary_from'))
			.required()
			.error(() => ka.joi.salary_required),
		experience_from: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.experience_required),
		experience_to: Joi.number()
			.integer()
			.greater(Joi.ref('experience_from'))
			.required()
			.error(() => ka.joi.experience_required),
		description: Joi.string()
			.max(400)
			.trim()
			.error(() => ka.joi.description_valid)
	}
}

export default CreateJobSchema
