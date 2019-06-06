/* eslint-disable no-mixed-spaces-and-tabs */
import models from 'database/modelBootstrap'
import JobService from '../services/JobService'
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
	static async matchAndCreate(user_id, company_id, request) {
		// save the job into database
		let job = await JobService.create(user_id, company_id, request.job)

		// create the requirements
		await JobService.setJobRequirements(job.id, request.requrements)

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
				}
				// {
				// 	// degree of user
				// 	// degrees should have a weight
				// 	model: models.UserEducation,
				// 	where: request.requrements.degree ? { degree_id: request.job.degree_id } : {}
				// }
				// {
				// 	model: models.UserWorkingExperience,
				// 	where: request.requrements.experience
				// 		? {
				// 			experience_from: {
				// 				[operator.gte]: expByProfession.ex_dayes / 360
				// 			},
				// 			experience_to: {
				// 				[operator.lte]: [request.job.salary_from, request.job.salary_to]
				// 			}
				// 		  }
				// 		: {}
				// },
				// {
				// 	model: models.UserQualification,
				// 	where: request.requrements.qualification
				// 		? {
				// 			qualification_id: {
				// 				[operator.in]: request.job.qualifications
				// 			}
				// 		  }
				// 		: {}
				// }
			]
		})

		// loop the required users to determine percentage and save into databse
		users.forEach(user => {
			// save the user into database
			JobService.setJobUsers(job.id, user.id, 75.5)
		})

		return users
		// return await this.getExperienceByProfession(5, 1)
	}

	/**
	 *
	 */
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
