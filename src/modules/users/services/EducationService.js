import models from 'database/modelBootstrap'

/**
 * Education Service Class
 */
class EducationService {
	/**
	 * create record for user and education
	 */
	static async create(userId, data) {
		// add auth user in body
		data.user_id = userId
		// create working experience
		return await models.UserEducation.create(data)
	}

	/**
	 * get list of user education
	 */
	static async list(userId) {
		// get auth user instance
		let user = await models.User.findByPk(userId)
		// fetch and return list of user education
		return await user.getUserEducations({
			attributes: ['id', 'started_at', 'finished_at'],
			include: [models.Degree, models.University, models.Faculty]
		})
	}

	/**
	 * Update user education
	 */
	static async update(id, user_id, data) {
		// get working experience by id
		let userEducation = await models.UserEducation.findOne({ where: { id, user_id } })
		// update working experience
		let updatedUserEducation = await userEducation.update(data)
		// throw error on negative result
		if (updatedUserEducation === null) {
			throw new Error()
		}
		// return updated record
		return updatedUserEducation
	}

	/**
	 * Delete user education
	 */
	static async delete(id, user_id) {
		// get instance by id
		let userEducation = await models.UserEducation.findOne({ where: { id, user_id } })
		// destroy record
		return await userEducation.destroy()
	}
}
export default EducationService
