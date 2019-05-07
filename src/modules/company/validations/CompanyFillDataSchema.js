import Joi from '@hapi/joi'

const CompanyFillDataSchema = {
	body: {
		name: Joi.string()
			.min(2)
			.required(),
		industry_id: Joi.number().integer(),
		identification_code: Joi.number()
			.min(2)
			.required()
		// logo: Joi.string().required()
	}
}

export default CompanyFillDataSchema
