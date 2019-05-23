// import models from 'database/modelBootstrap'
// import sequelize from 'sequelize'
/**
 * job service
 */
class MatchService {
	/**
	 * get list of jobs, filtered by company_id and active_status
	 */
	static async match(request) {
		return request
		// // set the crietrisas and perentage
		// let criteria = {}
		// // let percentage = {}
		// // get the profession id from job
		// criteria.profession_id = request.job.profession_id
		// // request.requrements.city ? (criteria.city_id = request.job.city_id) : (percentage.city_id = request.job.city_id)
		// // request.requrements.working_type ? (criteria.working_type_id = request.job.working_type_id) : (percentage.working_type_id = request.job.working_type_id)
		// // request.requrements.role ? (criteria.role_id = request.job.role_id) : (percentage.role_id = request.job.role_id)
		// // request.requrements.profession ? (criteria.profession_id = request.job.profession_id) : (percentage.profession_id = request.job.profession_id)
		// // request.requrements.skills ? (criteria.skills = request.job.skills) : (percentage.skills = request.job.skills)
		// // request.requrements.salary ? (criteria.city_id = request.job.city_id) : (percentage.city_id = request.job.city_id)
		// // request.requrements.education ? (criteria.city_id = request.job.city_id) : (percentage.city_id = request.job.city_id)
		// // request.requrements.education ? (criteria.city_id = request.job.city_id) : (percentage.city_id = request.job.city_id)
		// // request.requrements.experience ? (criteria.city_id = request.job.city_id) : (percentage.city_id = request.job.city_id)
		// // request.requrements.languages ? (criteria.city_id = request.job.city_id) : (percentage.city_id = request.job.city_id)
		// // request.requrements.qualification ? (criteria.city_id = request.job.city_id) : (percentage.city_id = request.job.city_id)
		// let users = await models.User.findAll({
		// 	include: [
		// 		{
		// 			model: models.UserProfession,
		// 			where: { profession_id: criteria.profession_id }
		// 		},
		// 		{
		// 			model: models.City,
		// 			where: { city_id: criteria.profession_id }
		// 		}
		// 	]
		// })

		// return users
		// // return { criteria, percentage }
	}
}

export default MatchService
