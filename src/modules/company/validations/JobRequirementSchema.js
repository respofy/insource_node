import Joi from '@hapi/joi'

const JobRequirementSchema = {
	body: {
		job_id: Joi.number()
			.integer()
			.required(),
		city: Joi.boolean(),
		working_type: Joi.boolean(),
		role: Joi.boolean(),
		profession: Joi.boolean(),
		skills: Joi.boolean(),
		salary: Joi.boolean(),
		education: Joi.boolean(),
		experience: Joi.boolean(),
		languages: Joi.boolean(),
		qualification: Joi.boolean()
	}
}

export default JobRequirementSchema
