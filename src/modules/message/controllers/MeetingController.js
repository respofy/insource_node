import ka from 'lang/ka'
import response from 'helper/Response'
import MeetingService from '../services/MeetingService'

/**
 * Meeting Controller
 */
class MeetingController {
	/**
	 * Create meeting
	 */
	static async create(req, res) {
		try {
			// create meeting from service
			let meeting = await MeetingService.createMeeting(req.body)
			// response
			res.json(response.success(ka.request_success, meeting))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * Read user meetings
	 */
	static async readUserMeetings(req, res) {
		try {
			// read user meetings from service
			let meeting = await MeetingService.getUserMeetings(req.user.id)
			// response
			res.json(response.success(ka.request_success, meeting))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * Read company meetings
	 */
	static async readCompanyMeetings(req, res) {
		try {
			// read user meetings from service
			let meeting = await MeetingService.getMeetingsByCriteria({ job_id: req.body.job_id })
			// response
			res.json(response.success(ka.request_success, meeting))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}
}

export default MeetingController
