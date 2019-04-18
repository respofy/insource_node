import Joi from 'joi'

const FavoriteCompanyAddSchema = {
	body: {
		company_id: Joi.number().required()
	}
}

export default FavoriteCompanyAddSchema
