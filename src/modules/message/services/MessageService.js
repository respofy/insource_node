import models from 'database/modelBootstrap'
import moment from 'moment'
import sequelize from 'sequelize'
const operator = sequelize.Op

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
	 * list of the jobs for companies
	 */
	static async userJobList(user_id) {
		// job list responce
		return await models.JobUser.findAll({
			attributes: ['id', 'job_id', 'user_id', 'percentage', 'approved_by_user'],
			where: {
				user_id
			},
			include: {
				attributes: ['id', 'title'],
				model: models.Job,
				where: {
					active: true,
					started_at: {
						[operator.lte]: moment()
					},
					finished_at: {
						[operator.gte]: moment()
					}
				},
				include: {
					model: models.Message,
					attributes: ['id', 'content'],
					where: {
						is_read: false
					},
					required: false
				}
			}
		})
	}

	/**
	 * list of the users by jobs
	 */
	static async companyJobUsers(job_id) {
		// fetch all jobs
		return await models.JobUser.findAll({
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
	}

	/**
	 * list of messages for companies
	 */
	static async companyMessageHistory(company_id, job_id, user_id) {
		// list of the messages
		return await models.Message.findAll({
			attributes: ['id', 'sender_id', 'receiver_id', 'company_id', 'job_id', 'content', 'is_read'],
			where: {
				company_id,
				job_id,
				[operator.or]: [{ sender_id: user_id }, { receiver_id: user_id }]
			},
			include: [
				{
					model: models.Company,
					attributes: ['id', 'name', 'logo'],
					required: false
				},
				{
					model: models.User,
					attributes: ['id', 'name', 'surname', 'avatar'],
					as: 'receiver',
					required: false
				},
				{
					model: models.User,
					attributes: ['id', 'name', 'surname', 'avatar'],
					as: 'sender',
					required: false
				}
			]
		})
	}

	/**
	 * list of messages for user
	 */
	static async userMessageHistory(job_id, user_id) {
		// list of the messages
		return await models.Message.findAll({
			attributes: ['id', 'sender_id', 'receiver_id', 'company_id', 'job_id', 'content', 'is_read'],
			where: {
				job_id,
				[operator.or]: [{ sender_id: user_id }, { receiver_id: user_id }]
			},
			include: [
				{
					model: models.Company,
					attributes: ['id', 'name', 'logo'],
					required: false
				},
				{
					model: models.User,
					attributes: ['id', 'name', 'surname', 'avatar'],
					as: 'receiver',
					required: false
				},
				{
					model: models.User,
					attributes: ['id', 'name', 'surname', 'avatar'],
					as: 'sender',
					required: false
				}
			]
		})
	}

	/**
	 * list of the jobs for user
	 */

	/**
	 * company job detail page
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
