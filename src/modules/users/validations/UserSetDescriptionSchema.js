import Joi from 'joi'

const UserSetDescriptionSchema = {
	body: {
		description: Joi.string()
			.max(400)
			.min(5)
			.trim()
	}
}

export default UserSetDescriptionSchema
