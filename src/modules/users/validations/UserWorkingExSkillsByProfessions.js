import Joi from 'joi'

const UserWorkingExskillsByProfessions = {
	body: {
		profession_id: Joi.number()
			.integer()
			.required()
	}
}

export default UserWorkingExskillsByProfessions
