import Joi from 'joi'

const UserLanguageCreateSchema = {
	body: {
		started_at: Joi.date().required(),
		finished_at: Joi.date().min(Joi.ref('started_at')),
		language_id: Joi.number().required(),
		language_knowledge_id: Joi.number().required()
	}
}

export default UserLanguageCreateSchema
