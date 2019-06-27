/* eslint-disable no-mixed-spaces-and-tabs */
import models from 'database/modelBootstrap'
import sequelize from 'sequelize'
import moment from 'moment'
const operator = sequelize.Op

/**
 * TODO: Service class for Meetings
 */
class MeetingService {
	/**
	 * Creat meeting
	 */
	static async createMeeting(data) {
		return await models.Meeting.create({
			user_id: data.user_id,
			job_id: data.job_id,
			company_id: data.params.company_id,
			date: data.date,
			address: data.address,
			status: 1
		})
	}

	/**
	 * Creat meeting
	 */
	static async userMeetingsUpdate(id, status) {
		return await models.Meeting.update({ status }, { where: { id } })
	}

	/**
	 * Read meetings by criteria
	 */
	static async getUserMeetings(user_id, job_id) {
		return await models.Meeting.findAll({
			where: job_id
				? {
					user_id,
					job_id,
					date: {
						[operator.gte]: moment()
					}
				  }
				: {
					user_id,
					date: {
						[operator.gte]: moment()
					}
				  },
			attributes: ['id', 'date', 'address', 'status'],
			include: [
				{
					model: models.User,
					attributes: ['id', 'name', 'surname']
				},
				{
					model: models.Job,
					attributes: ['id', 'title'],
					include: {
						model: models.Company,
						attributes: ['id', 'logo', 'name']
					}
				}
			],
			order: [['id', 'DESC']]
		})
	}

	/**
	 * Read meetings by criteria
	 */
	static async getCompanyMeetingsList(company_id) {
		return await models.Meeting.findAll({
			where: {
				company_id
			}
		})
	}

	/**
	 * Read meetings by criteria
	 */
	static async getCompanyMeetings(company_id, user_id) {
		return await models.Job.findAll({
			where: { company_id },
			attributes: ['id', 'title'],
			include: {
				model: models.Meeting,
				where: user_id
					? {
						user_id
					  }
					: {},
				attributes: ['id', 'date', 'address', 'status'],
				include: [
					{
						model: models.User,
						attributes: ['id', 'name', 'surname', 'avatar']
					}
				],
				required: true
			}
		})
	}
}

export default MeetingService
