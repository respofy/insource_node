import Joi from '@hapi/joi'
import ka from 'lang/ka'

const JoinVerifySchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required(),
		code: Joi.string().length(4),
		hash: Joi.string().length(40)
	}
}

export default JoinVerifySchema
