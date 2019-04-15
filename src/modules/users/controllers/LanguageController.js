import ka from 'lang/ka'
import response from 'helper/Response'
import LanguageService from '../services/LanguageService'

class LanguageController {
	/**
	 * Get list of languages
	 */
	static async getLanguages(req, res) {
		try {
			// get languages
			let languages = await LanguageService.getLanguages()
			// response
			res.json(response.success(ka.request_success, languages))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Get language knowledge levels
	 */
	static async getLanguageLevels(req, res) {
		try {
			// get language knowledge levels
			let languageKnowledgeLevels = await LanguageService.getLanguageKnowledges()
			// response
			res.json(response.success(ka.request_success, languageKnowledgeLevels))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Create user language
	 */
	static async createUserLanguage(req, res) {
		try {
			// create new user language from language service
			let newUserLanguage = await LanguageService.createUserLanguage(req.user.id, req.body)
			// response
			res.json(response.success(ka.cv.user_language_created, newUserLanguage))
		} catch (error) {
			return res.json(response.error(ka.cv.user_language_create_error))
		}
	}

	/**
	 * Read  user languages
	 */
	static async getUserLanguages(req, res) {
		try {
			// fetch all user language
			let userLanguages = await LanguageService.readUserLanguages(req.user.id)
			// response
			res.json(response.success(ka.request_success, userLanguages))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Update user language
	 */
	static async updateUserLanguage(req, res) {
		try {
			// update user
			let updatedUserLanguage = await LanguageService.updateUserLanguage(req.query.id, req.user.id, req.body)
			// response
			res.json(response.success(ka.cv.user_language_updated, updatedUserLanguage))
		} catch (error) {
			return res.json(response.error(ka.cv.user_language_update_error))
		}
	}

	/**
	 * Delete user language
	 */
	static async deleteUserLanguage(req, res) {
		try {
			// delete user language from service
			await LanguageService.deleteUserLanguage(req.query.id, req.user.id)
			res.json(response.success(ka.request_success))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}
}

export default LanguageController
