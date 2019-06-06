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
	static async matchAndCreate(req, res) {
		try {
			// set requirements from service
			let match = await MatchService.matchAndCreate(req.user.id, req.body.params.company_id, req.body)
			// response
			res.json(response.success(ka.request_success, match))
		} catch (error) {
			res.json(response.error('match error', {}, error.message))
		}
	}
}

export default MatchController
