import response from 'helper/Response'
import ka from 'lang/ka'
import UserService from '../services/UserService'

/**
 *
 */
class UserController {
	/**
	 * create user working experience
	 */
	static async addWorkingExperience(req, res) {
		try {
			// create the item
			let create = await UserService.addWorkingExperience(req.user.id, req.body)
			// responce
			res.json(response.success(ka.request_success, create))
		} catch (error) {
			res.json(response.success(error.message))
		}
	}

	/**
	 * update user working experience
	 */
	static async updateWorkingExperience() {}

	/**
	 * Delete working experience
	 */
	static async deleteWorkingExperience(req, res) {
		try {
			// destroy user working experience from service
			await UserService.deleteWorkingExperience(req.params.id, req.user.id)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.success(error.message))
		}
	}

	/**
	 * Get list of working experiences by user
	 */
	static async listWorkingExperiences(req, res) {
		try {
			// fetch all working experiences by user
			let workingExps = await UserService.listWorkingExperiences(req.user.id)
			// response
			res.json(response.success(ka.request_success, workingExps))
		} catch (error) {
			res.json(response.success(error.message))
		}
	}

	/** -------------------------------------------------------------------- */

	/**
	 * Create user language
	 */
	static async addLanguage(req, res) {
		try {
			// create new user language from language service
			let newUserLanguage = await UserService.addLanguage(req.user.id, req.body)
			// response
			res.json(response.success(ka.cv.user_language_created, newUserLanguage))
		} catch (error) {
			return res.json(response.error(error.message))
			// return res.json(response.error(ka.cv.user_language_create_error))
		}
	}

	/**
	 * Update user language
	 */
	static async updateLanguage(req, res) {
		try {
			// update user
			let updatedUserLanguage = await UserService.updateLanguage(req.body.id, req.user.id, req.body)
			// response
			res.json(response.success(ka.cv.user_language_updated, updatedUserLanguage))
		} catch (error) {
			return res.json(response.error(ka.cv.user_language_update_error))
		}
	}

	/**
	 * Delete user language
	 */
	static async deleteLanguage(req, res) {
		try {
			// delete user language from service
			await UserService.deleteLanguage(req.query.id, req.user.id)
			res.json(response.success(ka.request_success))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Read  user languages
	 */
	static async readLanguages(req, res) {
		try {
			// fetch all user language
			let userLanguages = await UserService.readLanguages(req.user.id)
			// response
			res.json(response.success(ka.request_success, userLanguages))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}
	/** -------------------------------------------------------------------- */

	/**
	 * Set city in CV by id
	 */
	static async setCity(req, res) {
		try {
			// set city from user service
			await UserService.setCity(req.user.id, req.body.id)
			// response
			res.json(response.success(ka.cv.city_updated))
		} catch (error) {
			return res.json(response.error(ka.cv.city_not_updated))
		}
	}

	/**
	 * Set status in CV by id
	 */
	static async setStatus(req, res) {
		try {
			// set status from user service
			await UserService.setStatus(req.user.id, req.body.id)
			// response
			res.json(response.success(ka.cv.status_updated))
		} catch (error) {
			return res.json(response.error(ka.cv.status_not_updated))
		}
	}

	/**
	 * List of favorite companies
	 */
	static async favoriteCompanies(req, res) {
		try {
			// get favorite companies by user
			let favoriteCompanies = await UserService.getFavoriteCompanies(req.user.id)
			// response
			res.json(response.success(ka.request_success, favoriteCompanies))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Add company to favorites
	 */
	static async addCompanyToFavorites(req, res) {
		try {
			// add company to favorites
			await UserService.addCompanyToFavorites(req.user.id, req.body.company_id)
			// response
			res.json(response.success(ka.cv.add_company_to_favorites))
		} catch (error) {
			res.json(response.error(ka.cv.add_company_favorites_error))
		}
	}

	/**
	 * Remove company from favorites
	 */
	static async removeCompanyFromFavorites(req, res) {
		try {
			// remove company from favorites using user service
			await UserService.removeCompanyFromFavorites(req.user.id, req.body.company_id)
			// response
			res.json(response.success(ka.cv.remove_company_from_favorites))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}
}

export default UserController
