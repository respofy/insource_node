import models from 'database/modelBootstrap'
import UserService from './UserService'

class WorkingExperienceService {
	/**
	 * Get professions
	 */
	static async getProfessions() {
		return await models.Profession.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * Get roles
	 */
	static async getRoles() {
		return await models.Role.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * Get skills
	 */
	static async getSkills() {
		return await models.Skill.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * Create working experience
	 */
	static async create(userId, requestBody) {
		// get auth user
		let user = await UserService.authUser(userId)
		// add auth user in body
		requestBody.user_id = userId
		// create working experience
		return await user.createUserWorkingExperience(requestBody)
	}

	/**
	 * Get all working experience
	 */
	static async getAll(userId) {
		// get auth user
		let user = await UserService.authUser(userId)
		// read user working experiences
		return await user.getUserWorkingExperiences()
	}

	/**
	 * update working experience
	 */
	static async update(id, requestBody) {
		// get working experience by id
		let workingExp = await models.UserWorkingExperience.findOne({ where: { id } })
		// update working experience
		let updatedWorkingExp = await workingExp.update(requestBody)
		// throw error on negative result
		if (updatedWorkingExp === null) {
			throw new Error()
		}
		// return updated record
		return updatedWorkingExp
	}

	/**
	 * delete working experience
	 */
	static async delete(id) {
		// get working experience by id
		let workingExp = await models.UserWorkingExperience.findOne({ where: { id } })
		// delete working experience
		return await workingExp.destroy()
	}
}

export default WorkingExperienceService
