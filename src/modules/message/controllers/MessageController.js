import MessageService from '../services/MessageService'
import ka from 'lang/ka'
import response from 'helper/Response'

/**
 * TODO: Message Controller
 */
class MessageController {
	/**
	 * Get messages by candidate id
	 */
	static async getMessageByCandidate(req, res) {}

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
