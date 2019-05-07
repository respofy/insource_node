import Joi from 'joi'

const MessageCreateSchema = {
	body: {
		sender_id: Joi.number().required(),
		receiver_id: Joi.number().required(),
		company_id: Joi.number().required(),
		job_id: Joi.number().required(),
		content: Joi.string().required().trim()
	}
}

export default MessageCreateSchema
