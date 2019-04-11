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
}

export default EducationController
