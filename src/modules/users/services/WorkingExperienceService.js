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
}

export default WorkingExperienceService
