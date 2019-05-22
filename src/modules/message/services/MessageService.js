import models from 'database/modelBootstrap'

/**
 * Service class for Messages
 */
class MessageService {
	/**
	 * Save message after sending
	 */
	static async saveMessage(data) {
		return await models.Message.create({
			sender_id: data.sender_id,
			receiver_id: data.receiver_id,
			company_id: data.company_id,
			job_id: data.job_id,
			content: data.content
		})
	}
}

export default MessageService
