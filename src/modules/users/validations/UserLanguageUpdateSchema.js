import Joi from 'joi'

const UserLanguageUpdateSchema = {
	body: {
		language_id: Joi.number(),
		language_knowledge_id: Joi.number(),
	}
}

export default UserLanguageUpdateSchema
