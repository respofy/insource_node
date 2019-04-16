import Joi from 'joi'

const InterestProfessionSetSchema = {
	body: {
		profession_id: Joi.number().required()
	}
}

export default InterestProfessionSetSchema
