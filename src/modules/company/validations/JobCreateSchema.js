import Joi from '@hapi/joi'

const JobCreateSchema = {
	body: {
		job: {
			city_id: Joi.number().required(),
			working_type_id: Joi.number().required(),
			title: Joi.string().required(),
			role_id: Joi.number().required(),
			profession_id: Joi.number().required(),
			skills: Joi.array().required(),
			salary_from: Joi.number().required(),
			salary_to: Joi.number().required(),
			degree_id: Joi.number().required(),
			experience_from: Joi.number().required(),
			experience_to: Joi.number().required(),
			qualifications: Joi.array().required(),
			// extra parameters
			language_id: Joi.number(),
			language_knowledge_id: Joi.number(),
			description: Joi.string()
		},
		params: {
			company_id: Joi.number()
		},
		requrements: {
			city: Joi.boolean(),
			working_type: Joi.boolean(),
			role: Joi.boolean(),
			profession: Joi.boolean(),
			skills: Joi.boolean(),
			salary: Joi.boolean(),
			degree: Joi.boolean(),
			experience: Joi.boolean(),
			languages: Joi.boolean(),
			qualification: Joi.boolean()
		}
	}
}

export default JobCreateSchema
