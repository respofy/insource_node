// import UserService from '../services/UserService'
import ka from 'lang/ka'
import response from 'helper/Response'
import WorkingExService from '../services/WorkingExService'
import CompanyService from 'modules/company/services/CompanyService'
/**
 * Resourceful controller for user working experience
 */
class WorkingExController {
	/**
	 *
	 */
	static async companies(req, res) {
		try {
			// get the roles form service
			let companies = await CompanyService.searchCompaniesByName(req.body.criteria)
			// return the responce
			res.json(response.success(ka.request_success, companies))
		} catch (error) {
			res.json(response.success(ka.request_error))
		}
	}
	/**
	 *
	 */
	static async roles(req, res) {
		try {
			// get the roles form service
			let roles = await WorkingExService.getRoles()
			// return the responce
			res.json(response.success(ka.request_success, roles))
		} catch (error) {
			res.json(response.success(ka.request_error))
		}
	}
	/**
	 *
	 */
	static async professions(req, res) {
		try {
			// get the roles form service
			let professions = await WorkingExService.getProfessions()
			// return the responce
			res.json(response.success(ka.request_success, professions))
		} catch (error) {
			res.json(response.success(ka.request_error))
		}
	}
	/**
	 *
	 */
	static async skillsByProfessions(req, res) {
		try {
			// get the roles form service
			let skillsByProfession = await WorkingExService.getSkillsByProfession(req.body.profession_id)
			// eslint-disable-next-line no-console
			// return the responce
			res.json(response.success(ka.request_success, skillsByProfession))
		} catch (error) {
			res.json(response.success(ka.request_error))
		}
	}

	/**
	 * Get skills by
	 */
	static async skillsByWorkingExperience(req, res) {
		try {
			// get skills from working experience service by user working experience
			let skills = await WorkingExService.getSkillsByWorkingExperience(req.body.user_working_ex_id)
			// response
			res.json(response.success(ka.request_success, skills))
		} catch (error) {
			res.json(response.success(ka.request_error))
		}
	}

	/**
	 *
	 */
	static async create(req, res) {
		try {
			// create the item
			let create = await WorkingExService.create(req.user.id, req.body)
			// responce
			res.json(response.success(ka.request_success, create))
		} catch (error) {
			res.json(response.success(error.message))
		}
	}
	/**
	 *
	 */
	static async update() {}
	/**
	 *
	 */
	static async delete() {}
	/**
	 * Get list of working experiences by user
	 */
	static async list(req, res) {
		try {
			// fetch all working experiences by user
			let workingExps = await WorkingExService.getAll(req.user.id)
			// response
			res.json(response.success(ka.request_success, workingExps))
		} catch (error) {
			res.json(response.success(error.message))
		}
	}
	/**
	 * Create user working experience
	 */
	// static async create(req, res) {
	// 	try {
	// 		// create working experience
	// 		let workingExperience = await WorkingExperienceService.create(req.user.id, req.body)
	// 		// response
	// 		res.json(response.success(ka.cv.working_exp_created, workingExperience))
	// 	} catch (error) {
	// 		return res.json(response.error(ka.cv.working_exp_create_error))
	// 	}
	// }
	// /**
	//  * Read all user working experiences
	//  */
	// static async getAll(req, res) {
	// 	try {
	// 		// fetch all user Experience
	// 		let userWorkingExps = await WorkingExperienceService.getAll(req.user.id)
	// 		// response
	// 		res.json(response.success(ka.request_success, userWorkingExps))
	// 	} catch (error) {
	// 		return res.json(response.error(error.message))
	// 	}
	// }
	// /**
	//  * Update user working experience
	//  */
	// static async update(req, res) {
	// 	try {
	// 		// update working experience
	// 		let updatedWorkingExp = WorkingExperienceService.update(req.params.id, req.body)
	// 		// response
	// 		res.json(response.success(ka.cv.working_exp_updated, updatedWorkingExp))
	// 	} catch (error) {
	// 		return res.json(response.error(ka.cv.working_exp_update_error))
	// 	}
	// }
	// /**
	//  * Delete user working experience
	//  */
	// static async delete(req, res) {
	// 	try {
	// 		// get working experience by id
	// 		await WorkingExperienceService.delete(req.params.id)
	// 		// response
	// 		res.json(response.success(ka.cv.working_exp_deleted))
	// 	} catch (error) {
	// 		return res.json(response.error(ka.cv.working_exp_deleted_error))
	// 	}
	// }
}

export default WorkingExController
