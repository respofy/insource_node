import Joi from 'joi'

const InterestWorkingTypeSetSchema = {
	body: {
		working_type_id: Joi.number().required()
	}
}

export default InterestWorkingTypeSetSchema
