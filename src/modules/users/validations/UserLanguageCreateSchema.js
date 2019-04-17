import Joi from 'joi'

const UserLanguageCreateSchema = {
	body: {
		language_id: Joi.number().required(),
		language_knowledge_id: Joi.number().required()
	}
}

export default UserLanguageCreateSchema
