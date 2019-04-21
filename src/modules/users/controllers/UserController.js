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
			let userLanguage = await UserService.addLanguage(req.user.id, req.body)
			// response
			res.json(response.success(ka.cv.user_language_created, userLanguage))
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log(error)
			// TODO: should implement log
			return res.json(response.error(ka.cv.user_language_create_error))
		}
	}

	/**
	 * Update user language
	 */
	static async updateLanguage(req, res) {
		try {
			// update user
			let updatedUserLanguage = await UserService.updateLanguage(req.params.id, req.body)
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
			await UserService.deleteLanguage(req.params.id)
			// make responce
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
	 * create user education
	 */
	static async addEducation(req, res) {
		try {
			// create user education from education service
			let createEducation = await UserService.addEducation(req.user.id, req.body)
			// return  response
			res.json(response.success(ka.request_success, createEducation))
		} catch (error) {
			res.json(response.error(ka.cv.user_education_create_error))
		}
	}

	/**
	 * Update user education by ID
	 */
	static async updateEducation(req, res) {
		try {
			// update education from education service
			let updatedEducation = await UserService.updateEducation(req.params.id, req.body)
			// return response
			res.json(response.success(ka.cv.user_education_updated, updatedEducation))
		} catch (error) {
			// eslint-disable-next-line no-console
			console.log('error', error)
			res.json(response.error(error.message))
			// res.json(response.error(ka.cv.user_education_update_error))
		}
	}

	/**
	 * Delete user education by ID
	 */
	static async deleteEducation(req, res) {
		try {
			// delete user education from service
			await UserService.deleteEducation(req.query.id, req.user.id)
			// response
			res.json(response.success(ka.cv.user_education_deleted))
		} catch (error) {
			res.json(response.error(ka.cv.user_education_delete_error))
		}
	}

	/**
	 * Get list of education by user
	 */
	static async readEducation(req, res) {
		try {
			// get list educations by auth user id
			let userEducation = await UserService.readEducation(req.user.id)
			// response
			res.json(response.success(ka.request_success, userEducation))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/** -------------------------------------------------------------------- */

	/**
	 * Create user certificate
	 */
	static async addCertificate(req, res) {
		try {
			// create service from certificate service
			let certificate = await UserService.addCertificate(req.user.id, req.body)
			// return created certificate
			res.json(response.success(ka.cv.certificate_created, certificate))
		} catch (error) {
			res.json(response.error(ka.cv.certificate_create_error))
		}
	}

	/**
	 * Update user certificate
	 */
	static async updateCertificate(req, res) {
		try {
			// update education from education service
			let updatedCertificate = await UserService.updateCertificate(req.params.id, req.body)
			// return response
			res.json(response.success(ka.cv.certificate_updated, updatedCertificate))
		} catch (error) {
			res.json(response.error(ka.cv.certificate_update_error))
		}
	}

	/**
	 * Delete user certificate
	 */
	static async deleteCertificate(req, res) {
		try {
			// delete user education from service
			await UserService.deleteCertificate(req.params.id)
			// response
			res.json(response.success(ka.cv.certificate_deleted))
		} catch (error) {
			res.json(response.error(ka.cv.certificate_delete_error))
		}
	}

	/**
	 * Get list of user certificates
	 */
	static async readCertificate(req, res) {
		try {
			// fetch list from service
			let userCertificates = await UserService.readCertificate(req.user.id)
			// response
			res.json(response.success(ka.request_success, userCertificates))
		} catch (error) {
			res.json(response.error(error.message))
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
