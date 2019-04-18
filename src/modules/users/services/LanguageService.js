import models from 'database/modelBootstrap'
import UserService from './UserService'

class LanguageService {
	/**
	 * Create user language
	 */
	static async createUserLanguage(userId, data) {
		// get auth user
		let user = await AuthService.authUser(userId)
		// add auth user in body
		data.user_id = userId
		// create working experience
		return await user.createUserLanguage(data)
	}

	/**
	 * Read all user languages
	 */
	static async readUserLanguages(userId) {
		// get auth user
		let user = await AuthService.authUser(userId)
		// read user working experiences
		return await user.getUserLanguages({
			attributes: ['id'],
			include: [models.Language, models.LanguageKnowledge]
		})
	}

	/**
	 * Update user language
	 */
	static async updateUserLanguage(id, user_id, data) {
		// get working experience by id
		let userLanguage = await models.UserLanguage.findOne({ where: { id, user_id } })
		// update working experience
		let updatedUserLanguage = await userLanguage.update(data)
		// throw error on negative result
		if (updatedUserLanguage === null) {
			throw new Error()
		}
		// return updated record
		return updatedUserLanguage
	}

	// Delete user language
	static async deleteUserLanguage(id, user_id) {
		// get working experience by id
		let userLanguage = await models.UserLanguage.findOne({ where: { id, user_id } })
		// check result
		if (userLanguage === null) {
			throw new Error()
		}
		// delete working experience
		return await userLanguage.destroy()
	}
}

export default LanguageService
