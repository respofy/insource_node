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
	 *
	 * მიმართულება 20 ROLE
	 * TODO: სამუშაო გამოცდილება 15 working ex
	 * განათლების ხარისხი 15 eduation degree
	 * საკვალიფიკაციო მოთხოვნები 15 qualificions
	 * სასურველი ხელფასი 15 sallary
	 * თანამდებობა 7.5 skills
	 * სასურველი კომპანია 7.5 favorite company
	 * ინდუსტრია 5 industry
	 */

	static async matchAndCreate(user_id, company_id, request) {
		// save the job into database
		let job = await JobService.create(user_id, company_id, request.job)

		// create the requirements
		await JobService.setJobRequirements(job.id, request.requrements)

		// education weight
		let educationLFT = await this.educationWeight(request.job.degree_id)

		// company
		let company = await models.Company.findOne({
			where: { id: company_id }
		})

		// get he users by required paramters
		let users = await models.User.findAll({
			attributes: ['id'],
			where: request.requrements.city ? { city_id: request.job.city_id } : {},
			include: [
				{
					/**
					 * first item which should be !important for merdge is profession
					 * its should be metched absoulutly
					 */

					model: models.UserProfession,
					where: {
						profession_id: request.job.profession_id,
						active: true // active means what is active users wish list
					}
				},
				{
					/**
					 * what kind of work user wants
					 * in this case we shoudl check if job maker marked this field as required
					 * if the field is requred where condiotion is taking place
					 */
					model: models.UserWorkingType,
					where: request.requrements.working_type
						? {
							working_type_id: request.job.working_type_id,
							active: true // active means what is active users wish list
						  }
						: {},
					required: false
				},
				{
					/**
					 * user role
					 */
					model: models.UserRole,
					where: request.requrements.role
						? {
							role_id: request.job.role_id,
							active: true // active means what is active users wish list
						  }
						: {},
					required: false
				},
				{
					/**
					 * user skill (multiple)
					 */
					model: models.UserSkill,
					where: request.requrements.skills
						? {
							skill_id: {
								[operator.in]: request.job.skills
							},
							active: true // active means what is active users wish list
						  }
						: {},
					required: false
				},
				{
					/**
					 * user wished salary
					 */
					model: models.Salary,
					where: request.requrements.salary
						? {
							salary_amount: {
								[operator.between]: [request.job.salary_from, request.job.salary_to]
							},
							active: true
						  }
						: {},
					required: false
				},
				{
					/**
					 * degree of user
					 * degrees should have a weight
					 */
					model: models.UserEducation,
					include: {
						model: models.Degree,
						where: request.requrements.degree
							? {
								lft: {
									[operator.gte]: educationLFT
								}
							  }
							: {}
					},
					required: false
				},
				{
					/**
					 * qualification
					 */
					model: models.UserQualification,
					where: request.requrements.qualification
						? {
							qualification_id: {
								[operator.in]: request.job.qualifications
							}
						  }
						: {},
					required: false
				}
				// TODO: working experience
			]
		})

		// loop the required users to determine percentage and save into databse
		users.forEach(async user => {
			let percentage = 0

			/**
			 * role
			 */
			let role = await models.User.findAndCountAll({
				where: { id: user.id },
				include: [
					{
						model: models.UserRole,
						where: {
							role_id: request.job.role_id,
							active: true
						}
					}
				]
			})

			if (role.count) {
				percentage = percentage + 20 // weight of role
			}

			// TODO: working experience

			/**
			 * education
			 */
			let education = await models.User.findAndCountAll({
				where: { id: user.id },
				include: [
					{
						model: models.UserEducation,
						include: {
							model: models.Degree,
							where: { lft: { [operator.gte]: educationLFT } }
						},
						required: true
					}
				]
			})

			if (education.count) {
				percentage = percentage + 15 // weight of salary
			}

			/**
			 * qualification
			 */
			let qualification = await models.User.findAndCountAll({
				where: { id: user.id },
				include: [
					{
						model: models.UserQualification,
						where: {
							qualification_id: {
								[operator.in]: request.job.qualifications
							}
						}
					}
				]
			})

			if (qualification.count) {
				percentage = percentage + 15 // weight of qualification
			}

			/**
			 * salary
			 */
			let salary = await models.User.findAndCountAll({
				where: { id: user.id },
				include: [
					{
						model: models.Salary,
						where: {
							salary_amount: {
								[operator.between]: [request.job.salary_from, request.job.salary_to]
							},
							active: true
						}
					}
				]
			})

			if (salary.count) {
				percentage = percentage + 15 // weight of salary
			}

			/**
			 * skills
			 */
			let skills = await models.User.findAndCountAll({
				where: { id: user.id },
				include: [
					{
						model: models.UserSkill,
						where: {
							skill_id: {
								[operator.in]: request.job.skills
							},
							active: true // active means what is active users wish list
						}
					}
				]
			})

			if (skills.count) {
				percentage = percentage + 7.5 // weight of skills
			}

			/**
			 * favourite company
			 */
			let favCompany = await models.User.findAndCountAll({
				where: { id: user.id },
				include: [
					{
						model: models.Company,
						as: 'FavoriteCompanies',
						where: {
							id: company_id
						}
					}
				]
			})

			if (favCompany.count) {
				percentage = percentage + 7.5 // weight of favCompany
			}

			/**
			 * industry
			 */
			let industry = await models.User.findAndCountAll({
				where: { id: user.id },
				include: [
					{
						model: models.UserIndustry,
						where: {
							industry_id: company.industry_id,
							active: true // active means what is active users wish list
						}
					}
				]
			})

			if (industry.count) {
				percentage = percentage + 5 // weight of skills
			}

			// save the user into database
			JobService.setJobUsers(job.id, user.id, percentage)
		})

		return users
		// return await this.getExperienceByProfession(5, 1)
	}

	/**
	 * working experience based on profession
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

	/**
	 * get the education weigt
	 */
	static async educationWeight(education_id) {
		let degree = await models.Degree.findOne({
			where: {
				id: education_id
			}
		})

		return degree.lft
	}
}

export default MatchService
