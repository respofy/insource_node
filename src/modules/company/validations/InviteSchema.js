import Joi from '@hapi/joi'
import ka from 'lang/ka'

const InviteSchema = {
	body: Joi.array()
		.items(
			Joi.string()
				.email()
				.error(() => 'მეილი არ არის ვალიდური')
		)
		.min(1)
		.required()
		.error(() => ka.joi.invite_by_phone)
}

export default InviteSchema
