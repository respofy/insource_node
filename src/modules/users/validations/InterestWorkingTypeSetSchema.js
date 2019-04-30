import Joi from '@hapi/joi'

const InterestWorkingTypeSetSchema = {
	body: {
		working_type_id: Joi.number().required()
	}
}

export default InterestWorkingTypeSetSchema
