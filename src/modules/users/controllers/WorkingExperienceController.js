import models from 'database/modelBootstrap'
import ka from 'lang/ka'
// import UserService from '../services/UserService'
import response from 'helper/Response'
import WorkingExperienceService from '../services/WorkingExperienceService'

/**
 * Resourceful controller for user working experience
 */
class WorkingExperienceController {
	/**
	 * Create user working experience
	 */
	static async create(req, res) {
		try {
			// create working experience
			let workingExperience = await WorkingExperienceService.create(req.user.id, req.body)
			// response
			res.json(response.success(ka.cv.working_exp_created, workingExperience))
		} catch (error) {
			return res.json(response.error(ka.cv.working_exp_create_error))
		}
	}

	/**
	 * Read all user working experiences
	 */
	static async getAll(req, res) {
		try {
			// fetch all user Experience
			let userWorkingExps = await WorkingExperienceService.getAll(req.user.id)
			// response
			res.json(response.success(ka.request_success, userWorkingExps))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Update user working experience
	 */
	static async update(req, res) {
		try {
			// get working experience by id
			let workingExp = await models.UserWorkingExperience.findOne({ where: { id: req.params.id } })
			// update working experience
			let updatedWorkingExp = await workingExp.update(req.body)
			// response
			res.json(response.success(ka.cv.working_exp_updated, updatedWorkingExp))
		} catch (error) {
			return res.json(response.error(ka.cv.working_exp_update_error))
		}
	}

	/**
	 * Delete user working experience
	 */
	static async delete(req, res) {
		try {
			// get working experience by id
			let workingExp = await models.UserWorkingExperience.findOne({ where: { id: req.params.id } })
			// delete working experience
			await workingExp.destroy()
			// response
			res.json(response.success(ka.cv.working_exp_deleted))
		} catch (error) {
			return res.json(response.error(ka.cv.working_exp_deleted_error))
		}
	}
}

export default WorkingExperienceController
