import Joi from 'joi'

const InterestRoleSetSchema = {
	body: {
		role_id: Joi.number().required()
	}
}

export default InterestRoleSetSchema
