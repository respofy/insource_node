import Joi from 'joi'

const InterestIndustrySetSchema = {
	body: {
		industry_id: Joi.number().required()
	}
}

export default InterestIndustrySetSchema
