import Joi from 'joi'

const UserLanguageUpdateSchema = {
	body: {
		started_at: Joi.date(),
		finished_at: Joi.date().min(Joi.ref('started_at')),
		language_id: Joi.number(),
		language_knowledge_id: Joi.number(),
	}
}

export default UserLanguageUpdateSchema
