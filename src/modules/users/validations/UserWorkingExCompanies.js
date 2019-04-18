import Joi from 'joi'

const UserWorkingExCompanies = {
	body: {
		criteria: Joi.string().min(3)
	}
}

export default UserWorkingExCompanies
