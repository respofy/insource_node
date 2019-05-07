import Joi from '@hapi/joi'

const InterestSalarySetSchema = {
	body: {
		salary_amount: Joi.number().required()
	}
}

export default InterestSalarySetSchema
