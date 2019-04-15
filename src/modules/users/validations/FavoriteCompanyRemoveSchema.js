import Joi from 'joi'

const FavoriteCompanyRemoveSchema = {
	body: {
		company_id: Joi.number().required()
	}
}

export default FavoriteCompanyRemoveSchema
