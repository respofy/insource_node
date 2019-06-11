import ka from 'lang/ka'
import response from 'helper/Response'
import InterestService from '../services/InterestService'

/**
 * Controller for interests
 */
class InterestController {
	/**
	 *
	 */
	static async setInterest(req, res) {
		// set multiple industries for user
		try {
			// set role to user from service
			await InterestService.setInterest(req.user.id, req.body)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			return res.json(response.error(error.message))
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
