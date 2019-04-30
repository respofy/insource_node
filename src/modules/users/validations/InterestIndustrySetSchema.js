import Joi from '@hapi/joi'

const InterestIndustrySetSchema = {
	body: {
		industry_id: Joi.number().required()
	}
}

export default InterestIndustrySetSchema
