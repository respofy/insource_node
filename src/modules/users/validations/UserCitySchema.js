import Joi from 'joi'

const UserCitySchema = {
	body: {
		id: Joi.number().required()
	}
}

export default UserCitySchema
