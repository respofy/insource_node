import models from 'database/modelBootstrap'
import moment from 'moment'
import sequelize from 'sequelize'

/**
 * Service class for Messages
 */
class MessageService {
	/**
	 * list of the jobs for companies
	 */
	static async companyJobList(company_id) {
		// job list responce
		return await models.sequelize.query(
			`SELECT id, title, finished_at,
            (SELECT COUNT(*) FROM messages WHERE job_id=jobs.id AND is_read = 0) as total_unread_messages 
            FROM jobs where company_id = ${company_id} AND active = 1 AND started_at <= '${moment().format('YYYY-MM-DD')}' AND finished_at >= '${moment().format('YYYY-MM-DD')}'
            ORDER BY id DESC`,
			{
				type: sequelize.QueryTypes.SELECT
			}
		)
	}

	/**
	 * list of the users by jobs
	 */
	static async companyJobUsers(job_id) {
		// fetch all jobs
		return await models.JobUser.findOne({
			where: {
				job_id
			},
			include: [
				{
					model: models.User,
					include: {
						model: models.Message,
						as: 'sender',
						where: {
							job_id,
							is_read: false
						},
						required: false
					}
				}
			]
		})

		// return await models.sequelize.query(
		// 	`SELECT job_users.user_id, job_users.percentage, job_users.approved_by_user,
		//     (SELECT COUNT(*) FROM messages WHERE job_users.job_id = ${job_id} AND messages.is_read = 0 AND messages.sender_id = job_users.user_id) as total_unread_messages,
		//     users.id, users.name, users.surname
		//     FROM job_users
		//     RIGHT JOIN users ON users.id = job_users.user_id
		//     WHERE job_users.job_id = ${job_id} AND job_users.approved_by_user = 1`,
		// 	{
		// 		type: sequelize.QueryTypes.SELECT
		// 	}
		// )
	}

	/**
	 * company job detail page
	 */

	/**
	 * list of the jobs for user
	 */

	/**
	 * Save message after sending
	 */
	static async saveMessage(data) {
		// cretae message record
		return await models.Message.create({
			sender_id: data.sender_id,
			receiver_id: data.receiver_id,
			company_id: data.company_id,
			job_id: data.job_id,
			content: data.content,
			is_read: false
		})
	}

	// set message read
	// static async setMessageRead(data) {}
}

export default MessageService
