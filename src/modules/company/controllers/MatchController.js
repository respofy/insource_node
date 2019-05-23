import ka from 'lang/ka'
import MatchService from '../services/MatchService'
import response from 'helper/Response'

/**
 *
 */
class MatchController {
	/**
	 * Set job requirements
	 */
	static async match(req, res) {
		try {
			// set requirements from service
			let requirements = await MatchService.match(req.body)
			// response
			res.json(response.success(ka.request_success, requirements))
		} catch (error) {
			res.json(response.error('match error', {}, error.message))
		}
	}
}

export default MatchController
