import Joi from 'joi'

const UserCitySchema = {
	body: {
		name: Joi.string().required()
	}
}

export default UserCitySchema
