import models from 'database/modelBootstrap'
import UserService from './UserService'

class LanguageService {
	/**
	 * Get all language
	 */
	static async getLanguages() {
		// fetch all language
		return await models.Language.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * Get language knowledge levels
	 */
	static async getLanguageKnowledges() {
		// get language knowledges
		return await models.LanguageKnowledge.findAll({
			order: [['weight', 'ASC']]
		})
	}

	/**
	 * Create user language
	 */
	static async createUserLanguage(userId, requestBody) {
		// get auth user
		let user = await UserService.authUser(userId)
		// add auth user in body
		requestBody.user_id = userId
		// create working experience
		return await user.createUserLanguage(requestBody)
	}

	/**
	 * Read all user languages
	 */
	static async readUserLanguages(userId) {
		// get auth user
		let user = await UserService.authUser(userId)
		// read user working experiences
		return await user.getUserLanguages()
	}

	/**
	 * Update user language
	 */
	static async updateUserLanguage(id, requestBody) {
		// get working experience by id
        let userLanguage = await models.UserLanguage.findOne({ where: { id } })
		// update working experience
		let updatedUserLanguage = await userLanguage.update(requestBody)
		// throw error on negative result
		if (updatedUserLanguage === null) {
			throw new Error()
		}
		// return updated record
		return updatedUserLanguage
	}

	// Delete user language
	static async deleteUserLanguage(id) {
		// get working experience by id
		let userLanguage = await models.UserLanguage.findOne({ where: { id } })
		// delete working experience
		return await userLanguage.destroy()
	}
}

export default LanguageService
