// import AuthService from '../../users/services/AuthService'
import models from 'database/modelBootstrap'
import moment from 'moment'
import sequelize from 'sequelize'
const operator = sequelize.Op

/**
 * job service
 */
class JobService {
	/**
	 * list of jobs
	 */
	static async list(company_id) {
		return await models.sequelize.query(
			`SELECT id, title, finished_at,
			(SELECT COUNT(*) FROM job_users WHERE job_id=jobs.id) as total_users,
			(SELECT COUNT(*) FROM job_users WHERE job_id=jobs.id AND approved_by_user=1) as approved_users
			FROM jobs where company_id = ${company_id} AND active = 1 AND started_at <= '${moment().format('YYYY-MM-DD')}' AND finished_at >= '${moment().format('YYYY-MM-DD')}'`,
			{
				type: sequelize.QueryTypes.SELECT
			}
		)
	}
	/**
	 * list of jobs
	 */
	static async archiveList(company_id) {
		return await models.sequelize.query(
			`SELECT id, title, finished_at,
			(SELECT COUNT(*) FROM job_users WHERE job_id=jobs.id) as total_users,
			(SELECT COUNT(*) FROM job_users WHERE job_id=jobs.id AND approved_by_user=1) as approved_users
			FROM jobs where company_id = ${company_id} AND active = 0 OR finished_at <= '${moment().format('YYYY-MM-DD')}'`,
			{
				type: sequelize.QueryTypes.SELECT
			}
		)
	}

	/**
	 * get list of jobs, filtered by company_id and active_status
	 */
	static async detail(job_id) {
		// fetch all jobs
		return await models.Job.findOne({
			where: { id: job_id },
			attributes: ['id', 'started_at', 'finished_at', 'title', 'salary_from', 'salary_to', 'experience_from', 'experience_to', 'description'],
			include: [
				{
					model: models.Company,
					attributes: ['id', 'name', 'logo'],
					include: {
						model: models.Industry,
						attributes: ['id', 'title']
					}
				},
				{ model: models.WorkingType, attributes: ['id', 'title'] },
				{ model: models.City, attributes: ['id', 'name'] },
				{ model: models.Role, attributes: ['id', 'title'] },
				{ association: 'jobSkill', through: { attributes: [] } },
				{ association: 'jobQualification', through: { attributes: [] } },
				{ model: models.Profession, attributes: ['id', 'title'] },
				{ model: models.Degree, attributes: ['id', 'title'] },
				{ model: models.Language, attributes: ['id', 'title'] },
				{ model: models.LanguageKnowledge, attributes: ['id', 'title', 'weight'] }
			]
		})
	}

	/**
	 * get list of jobs, filtered by company_id and active_status
	 */
	static async detailUsers(job_id, filter) {
		// descripbe the criteria of query
		let criteria = {
			job_id
		}
		switch (filter) {
		case 'all':
			break
		case 'new':
			criteria = {
				...criteria,
				created_at: {
					[operator.gte]: moment().subtract(5, 'days')
				}
			}
			break
		case 'approved':
			criteria = { ...criteria, approved_by_user: true }
			break
		case 'best':
			criteria = {
				...criteria,
				percentage: {
					[operator.gte]: 80
				}
			}
			break
		}

		// fetch all jobs
		return await models.JobUser.findAll({
			where: criteria,
			attributes: ['id', 'percentage', 'approved_by_user', 'created_at'],
			include: [
				{
					model: models.User,
					attributes: ['id', 'name', 'surname', 'avatar', 'incognito'],
					include: [
						{
							model: models.UserProfession,
							attributes: ['id'],
							where: {
								active: true
							},
							include: {
								model: models.Profession,
								attributes: ['title']
							}
						},
						{
							model: models.Salary,
							attributes: ['id', 'salary_amount'],
							where: {
								active: true
							}
						},
						{
							model: models.UserWorkingType,
							attributes: ['id'],
							where: {
								active: true
							},
							include: {
								model: models.WorkingType,
								attributes: ['title']
							}
						},
						{
							model: models.UserEducation,
							attributes: ['id'],
							include: {
								model: models.Degree,
								attributes: ['title', 'lft']
							}
						},
						{
							model: models.City,
							attributes: ['id', 'name']
						}
					]
				}
			],
			order: [[models.User, models.UserEducation, models.Degree, 'lft', 'desc']]
		})
	}

	/**
	 * create job from active company
	 */
	static async create(user_id, company_id, data) {
		// create job by user active company
		let newJob = await models.Job.create({
			company_id: company_id,
			user_id: user_id,
			working_type_id: data.working_type_id,
			city_id: data.city_id,
			role_id: data.role_id,
			profession_id: data.profession_id,
			degree_id: data.degree_id,
			language_id: data.language_id,
			language_knowledge_id: data.language_knowledge_id,
			title: data.title,
			salary_from: data.salary_from,
			salary_to: data.salary_to,
			experience_from: data.experience_from,
			experience_to: data.experience_to,
			description: data.description,
			started_at: moment(),
			finished_at: moment().add(1, 'months')
		})

		// attach qualification demands to job
		await newJob.addJobQualification(data.qualifications)
		// attach skills to job
		await newJob.addJobSkill(data.skills)
		// return new instance
		return newJob
	}

	/**
	 * Delete job by id
	 */
	static async delete(id) {
		// get job by id
		let job = await models.Job.findByPk(id)
		// delete job
		return await job.destroy()
	}

	/**
	 * Archive job by id
	 */
	static async archive(id) {
		// get job by id
		let job = await models.Job.findByPk(id)
		// archive
		return await job.update({
			active: 0
		})
	}

	/**
	 * Set job requirements by id
	 */
	static async setJobRequirements(job_id, params) {
		return await models.JobRequirement.create({
			job_id: job_id,
			city: params.city,
			working_type: params.working_type,
			role: params.role,
			skills: params.skills,
			salary: params.salary,
			degree: params.degree,
			experience: params.experience,
			languages: params.languages,
			qualification: params.qualification
		})
	}

	/**
	 * Set job requirements by id
	 */
	static setJobUsers(job_id, user_id, percentage) {
		return models.JobUser.create({
			job_id: job_id,
			user_id: user_id,
			percentage: percentage,
			approved_by_user: false
		})
	}
}

export default JobService
