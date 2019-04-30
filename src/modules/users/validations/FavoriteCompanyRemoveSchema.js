import Joi from '@hapi/joi'

const FavoriteCompanyRemoveSchema = {
	body: {
		company_id: Joi.number().required()
	}
}

export default FavoriteCompanyRemoveSchema
