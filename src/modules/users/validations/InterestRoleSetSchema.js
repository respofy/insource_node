import Joi from '@hapi/joi'

const InterestRoleSetSchema = {
	body: {
		role_id: Joi.number().required()
	}
}

export default InterestRoleSetSchema
