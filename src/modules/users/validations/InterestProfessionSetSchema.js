import Joi from '@hapi/joi'

const InterestProfessionSetSchema = {
	body: {
		profession_id: Joi.number().required()
	}
}

export default InterestProfessionSetSchema
