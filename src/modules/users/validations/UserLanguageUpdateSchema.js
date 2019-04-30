import Joi from '@hapi/joi'

const UserLanguageUpdateSchema = {
	body: {
		id: Joi.number(),
		language_id: Joi.number(),
		language_knowledge_id: Joi.number()
	}
}

export default UserLanguageUpdateSchema
