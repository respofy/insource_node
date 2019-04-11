import Joi from 'joi'
import ka from 'lang/ka'

const UserWorkingExpUpdateSchema = {
	body: {
		started_at: Joi.date().error(() => ka.joi.date_valid),
		finished_at: Joi.date().error(() => ka.joi.date_valid),
		company_name: Joi.string().error(() => ka.joi.company_name_valid),
		company_id: Joi.number(),
		profession_id: Joi.number()
	}
}

export default UserWorkingExpUpdateSchema
