import Joi from '@hapi/joi'

const FavoriteCompanyAddSchema = {
	body: {
		company_id: Joi.number().required()
	}
}

export default FavoriteCompanyAddSchema
