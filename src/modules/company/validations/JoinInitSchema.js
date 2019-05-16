import Joi from '@hapi/joi'
import ka from 'lang/ka'

const JoinInitSchema = {
	body: {
		phone: Joi.string()
			.length(9)
			.required(),
		hash: Joi.string().length(40)
	}
}

export default JoinInitSchema
