import Joi from 'joi'
import ka from 'lang/ka'

const UserWorkingExpCreateSchema = {
	body: {
		started_at: Joi.date()
			.required()
			.error(() => ka.joi.date_valid),
		finished_at: Joi.date().min(Joi.ref('started_at')),
		company_name: Joi.string()
			.required()
			.error(() => ka.joi.company_name_required),
		company_id: Joi.number(),
		user_id: Joi.number(),
		profession_id: Joi.number()
			.required()
			.error(() => ka.joi.profession_required),
		role_id: Joi.number().required()
	}
}

export default UserWorkingExpCreateSchema
