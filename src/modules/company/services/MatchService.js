/* eslint-disable no-mixed-spaces-and-tabs */
import models from 'database/modelBootstrap'
// import moment from 'moment'
import sequelize from 'sequelize'
const operator = sequelize.Op
/**
 * job service
 */
class MatchService {
	/**
	 * get list of jobs, filtered by company_id and active_status
	 */
	static async match(request) {
		let [expByProfession] = await this.getExperienceByProfession(1, request.job.profession_id)
		// get he users by required paramters
		let users = await models.User.findAll({
			where: request.requrements.city ? { city_id: request.job.city_id } : {},
			include: [
				{
					// this is a general item without it query will not work
					model: models.UserProfession,
					where: request.job.profession_id
				},
				{
					model: models.UserWorkingType,
					where: request.requrements.working_type ? { working_type_id: request.job.working_type_id } : {}
				},
				{
					model: models.UserRole,
					where: request.requrements.role ? { role_id: request.job.role_id } : {}
				},
				{
					model: models.UserSkill,
					where: request.requrements.skills
						? {
							skill_id: {
								[operator.in]: request.job.skills
							}
						  }
						: {}
				},
				{
					model: models.Salary,
					where: request.requrements.salary
						? {
							salary_amount: {
								[operator.between]: [request.job.salary_from, request.job.salary_to]
							}
						  }
						: {}
				},
				{
					model: models.UserEducation,
					where: request.requrements.degree ? { degree_id: request.job.degree_id } : {}
				},
				{
					model: models.UserWorkingExperience,
					where: request.requrements.experience
						? {
							experience_from: {
								[operator.gte]: expByProfession.ex_dayes / 360
							},
							experience_to: {
								[operator.lte]: [request.job.salary_from, request.job.salary_to]
							}
						  }
						: {}
				},
				{
					model: models.UserQualification,
					where: request.requrements.qualification
						? {
							qualification_id: {
								[operator.in]: request.job.qualifications
							}
						  }
						: {}
				}
			]
		})

		// return users
		return await this.getExperienceByProfession(5, 1)
		// return { criteria, percentage }
	}

	static async getExperienceByProfession(user_id, profession_id) {
		// get experience by position
		let fullExperienceByProfession = await models.sequelize.query(
			'SELECT SUM(DATEDIFF(IF(t.finished_at IS NULL, NOW(), t.finished_at), started_at)) AS ex_dayes FROM `user_working_ex` t WHERE t.user_id = ' +
				user_id +
				' and t.profession_id = ' +
				profession_id +
				' GROUP BY t.user_id',
			{ type: sequelize.QueryTypes.SELECT }
		)

		return fullExperienceByProfession.ex_dayes
	}
}

export default MatchService
