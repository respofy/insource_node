import Joi from '@hapi/joi'
import ka from 'lang/ka'

const InviteSchema = {
	body: Joi.array()
		.items(
			Joi.string()
				.length(9)
				.error(() => ka.joi.phone_min_length)
		)
		.min(1)
		.required()
		.error(() => ka.joi.invite_by_phone)
}

export default InviteSchema
