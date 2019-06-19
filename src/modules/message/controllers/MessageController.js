import MessageService from '../services/MessageService'
import ka from 'lang/ka'
import response from 'helper/Response'
import models from 'database/modelBootstrap'

/**
 * TODO: Message Controller
 */
class MessageController {
	/**
	 * list of the jobs for companies
	 */
	static async companyJobList(req, res) {
		try {
			// save message from service
			let companyJobList = await MessageService.companyJobList(req.body.params.company_id)
			// response
			res.json(response.success(ka.request_success, companyJobList))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * list of the users by jobs
	 */
	static async companyJobUsers(req, res) {
		try {
			// check if company can create event
			let jobCount = await models.Job.findAndCountAll({
				where: {
					id: req.body.job_id,
					company_id: req.body.params.company_id
				}
			})
			if (jobCount.count == 0) {
				return res.json(response.error(ka.messages.user_not_in_job_list))
			}

			// save message from service
			let companyJobUsers = await MessageService.companyJobUsers(req.body.job_id)
			// response
			res.json(response.success(ka.request_success, companyJobUsers))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * Get messages message list
	 */
	static async list(req, res) {
		try {
			// save message from service
			let messages = await MessageService.list(req.body.params.company_id, req.body.job_id, req.body.user_id)
			// response
			res.json(response.success(ka.request_success, messages))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}
	// static async getMessageByCandidate(req, res) {}

	/**
	 * Send message
	 */
	static async saveMessage(req, res) {
		try {
			// save message from service
			await MessageService.saveMessage(req.body)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}
}

export default MessageController
