import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import response from 'helper/Response'
import UserService from '../services/UserService'

/**
 * Controller for interests
 */
class InterestController {
	/**
	 * Get all roles
	 */
	static async getRoles(req, res) {
		// fetch roles
		let roles = await models.Role.findAll()
		// response
		res.json(response.success(ka.request_success, roles))
	}

	/**
	 * Attach role to the user
	 */
	static async setRole(req, res) {
		try {
			// get auth user instance
			let user = await UserService.authUser(req.user.id)
			// attach role to useresult
			await user.addRole(req.body.role_id)
			res.json(response.success('როლი დაემატა'))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}
}

export default InterestController
