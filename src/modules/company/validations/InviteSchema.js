import Joi from '@hapi/joi'

const InviteSchema = {
	body: Joi.array()
		.min(1)
		.required()
}

export default InviteSchema
