import Joi from '@hapi/joi'

const UserCitySchema = {
	body: {
		id: Joi.number().required()
	}
}

export default UserCitySchema
