import response from 'helper/Response'
import ka from 'lang/ka'
import ReportService from '../services/ReportService'
/**
 * Report Controller
 */
class ReportController {
	/**
	 *
	 */
	static async mostWantedPositions(req, res) {
		try {
			let mostWantedPositions = await ReportService.mostWantedPositions(req.body.industry_id, req.body.date_from)
			// response
			res.json(response.success(ka.request_success, mostWantedPositions))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}
}

export default ReportController
