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
	 * list of the jobs for companies
	 */
	static async userJobList(req, res) {
		try {
			// save message from service
			let userJobList = await MessageService.userJobList(req.user.id)
			// response
			res.json(response.success(ka.request_success, userJobList))
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
			res.json(response.success(ka.request_success, companyJobUsers.length ? companyJobUsers : []))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * Get messages message list
	 */
	static async companyMessageHistory(req, res) {
		try {
			// save message from service
			let messages = await MessageService.companyMessageHistory(req.body.params.company_id, req.body.job_id, req.body.user_id)
			// response
			res.json(response.success(ka.request_success, messages))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

	/**
	 * Get messages message list
	 */
	static async userMessageHistory(req, res) {
		try {
			// check if user in in this list
			// check if company can create event
			// let jobCount = await models.JobUser.findAndCountAll({
			// 	where: {
			// 		user_id: req.user.id,
			// 		job_id: req.body.job_id
			// 	}
			// })
			// if (jobCount.count == 0) {
			// 	return res.json(response.error(ka.messages.user_not_in_job_list))
			// }

			// save message from service
			let messages = await MessageService.userMessageHistory(req.body.job_id, req.user.id)
			// response
			res.json(response.success(ka.request_success, messages))
		} catch (error) {
			res.json(response.error(ka.request_error, {}, error.message))
		}
	}

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
