import Joi from 'joi'

const CreateJobSchema = {
	body: {
		identification_code: Joi.string()
			.min(2)
			.required()
	}
}

export default CreateJobSchema
