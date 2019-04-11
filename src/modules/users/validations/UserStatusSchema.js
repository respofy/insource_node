import Joi from 'joi'

const UserStatusSchema = {
	body: {
		id: Joi.number().required()
	}
}

export default UserStatusSchema
