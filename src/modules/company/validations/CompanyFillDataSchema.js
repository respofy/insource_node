import Joi from '@hapi/joi'
import ka from 'lang/ka'

const CompanyFillDataSchema = {
	body: {
		name: Joi.string()
			.min(2)
			.trim()
			.error(() => ka.joi.company_name),
		industry_id: Joi.number()
			.integer()
			.required()
			.error(() => ka.joi.industry_required),
		identification_code: Joi.string()
			.regex(/[0-9]{9}/)
			.required()
			.error(() => ka.joi.identification_code)
	}
}

export default CompanyFillDataSchema
