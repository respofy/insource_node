// import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import UserService from '../services/UserService'
import response from 'helper/Response'

class WorkingExperienceController {
	static async create(req, res) {
		try {
			// get auth user
			let user = await UserService.authUser(req.user.id)
			// create working experience
			let workingExp = await user.createUserWorkingExperience({
				started_at: req.body.started_at,
				finished_at: req.body.finished_at,
				company_name: req.body.company_name,
				user_id: user.id,
				profession_id: req.body.profession_id
			})
			// response
			res.json(response.success(ka.cv.working_exp_created, workingExp))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}
}

export default WorkingExperienceController
