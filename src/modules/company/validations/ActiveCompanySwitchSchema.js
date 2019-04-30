import Joi from '@hapi/joi'

const ActiveCompanySwitchSchema = {
	body: {
		company_id: Joi.number()
			.integer()
			.required()
	}
}

export default ActiveCompanySwitchSchema
