// import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import response from 'helper/Response'
import EducationService from './../services/EducationService'

/**
 *
 *
 */
class EducationController {
	/**
	 * get the universities
	 */
	static async universities(req, res) {
		let universities = await EducationService.universities()
		res.json(response.success(ka.request_success, universities))
	}

	/**
	 * get the faculties
	 */
	static async faculties(req, res) {
		let faculties = await EducationService.faculties()
		res.json(response.success(ka.request_success, faculties))
	}
	/**
	 * get the degrees
	 */
	static async degrees(req, res) {
		let degrees = await EducationService.degrees()
		res.json(response.success(ka.request_success, degrees))
	}

	// create user education
	static async create(req, res) {
		try {
			// create user education from education service
			let createdEducation = await EducationService.create(req.user.id, req.body)
			// return  response
			res.json(response.success(ka.request_success, createdEducation))
		} catch (error) {
			res.json(response.error(ka.cv.user_education_create_error))
		}
	}

	/**
	 * Get list of education by user
	 */
	static async list(req, res) {
		try {
			// get list educations by auth user id
			let userEducation = await EducationService.list(req.user.id)
			// response
			res.json(response.success(ka.request_success, userEducation))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Update user education by ID
	 */
	static async update(req, res) {
		try {
			// update education from education service
			let updatedEducation = await EducationService.update(req.query.id, req.user.id, req.body)
			// return response
			res.json(response.success(ka.cv.user_education_updated, updatedEducation))
		} catch (error) {
			res.json(response.error(ka.cv.user_education_update_error))
		}
	}

	/**
	 * Delete user education by ID
	 */
	static async delete(req, res) {
		try {
			// delete user education from service
			await EducationService.delete(req.query.id, req.user.id)
			// response
			res.json(response.success(ka.cv.user_education_deleted))
		} catch (error) {
			res.json(response.error(ka.cv.user_education_delete_error))
		}
	}
}

export default EducationController
