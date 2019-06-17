import ka from 'lang/ka'
import response from 'helper/Response'
import MeetingService from '../services/MeetingService'
import models from 'database/modelBootstrap'

/**
 * Meeting Controller
 */
class MeetingController {
	/**
	 * Create meeting
	 */
	static async create(req, res) {
		try {
			// check if company can create event
			let jobCount = await models.Job.findAndCountAll({
				where: {
					id: req.body.job_id,
					company_id: req.body.params.company_id
				}
			})
			if (jobCount.count == 0) {
				return res.json(response.error(ka.user_not_in_job_list))
			}

			// check if user is inside the job
			let jobUserCount = await models.JobUser.findAndCountAll({
				where: {
					user_id: req.body.user_id,
					job_id: req.body.job_id
				}
			})
			if (jobUserCount.count == 0) {
				return res.json(response.error(ka.user_not_in_job_list))
			}

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
