import Joi from '@hapi/joi'

const UserStatusSchema = {
	body: {
		id: Joi.number().required()
	}
}

export default UserStatusSchema
