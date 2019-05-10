import Joi from '@hapi/joi'

const SearchCompanySchema = {
	body: {
		criteria: Joi.string()
			.min(3)
	}
}

export default SearchCompanySchema
