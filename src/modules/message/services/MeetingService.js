import models from 'database/modelBootstrap'

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
			address: data.address
		})
	}

	/**
	 * Read meetings by criteria
	 */
	static async getUserMeetings(user_id) {
		return await models.Meeting.findAll({
			where: { user_id },
			attributes: ['id', 'date', 'address'],
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
			]
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
	static async getCompanyMeetings(company_id) {
		return await models.Job.findAll({
			where: {
				company_id
			},
			attributes: ['id', 'title'],
			include: {
				model: models.Meeting,
				attributes: ['id', 'date', 'address'],
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
