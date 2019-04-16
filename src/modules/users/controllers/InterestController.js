import ka from 'lang/ka'
import response from 'helper/Response'
import InterestService from '../services/InterestService'

/**
 * Controller for interests
 */
class InterestController {
	/**
	 * Get all roles
	 */
	static async getRoles(req, res) {
		try {
			// fetch roles
			let roles = await InterestService.getRoles()
			// response
			res.json(response.success(ka.request_success, roles))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}

	/**
	 * Get Working Types
	 */
	static async getWorkingTypes(req, res) {
		try {
			// fetch working types
			let workingTypes = await InterestService.getWorkingTypes()
			// response
			res.json(response.success(ka.request_success, workingTypes))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}

	/**
	 * Get industries
	 */
	static async getIndustries(req, res) {
		try {
			// fetch list of industries from service
			let industries = await InterestService.getIndustries()
			// response
			res.json(response.success(ka.request_success, industries))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}

	/**
	 * Get professions
	 */
	static async getProfessions(req, res) {
		try {
			// fetch list of professions from service
			let professions = await InterestService.getProfessions()
			// response
			res.json(response.success(ka.request_success, professions))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}

	/**
	 * Set role to the user
	 */
	static async setRole(req, res) {
		try {
			// set role to user from service
			await InterestService.setRole(req.user.id, req.body.role_id)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Set working type to user
	 */
	static async setWorkingType(req, res) {
		try {
			// set working type from service
			await InterestService.setWorkingType(req.user.id, req.body.working_type_id)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Set Industry to user
	 */
	static async setIndustry(req, res) {
		try {
			// set industry from service
			await InterestService.setIndustry(req.user.id, req.body.industry_id)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Set profession to user
	 */
	static async setProfession(req, res) {
		try {
			// set industry from service
			await InterestService.setProfession(req.user.id, req.body.profession_id)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Set profession to user
	 */
	static async setSalary(req, res) {
		try {
			// set salary from service
			await InterestService.setSalary(req.user.id, req.body.salary_amount)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Get all user interest
	 */
	static async getInterests(req, res) {
		try {
			// fetch latest user interests
			let interests = await InterestService.getInterests(req.user.id)
			// response
			res.json(response.success(ka.request_success, interests))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}
}

export default InterestController
