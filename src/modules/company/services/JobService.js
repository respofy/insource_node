import AuthService from '../../users/services/AuthService'
import models from 'database/modelBootstrap'

/**
 * job service
 */
class JobService {
	/**
	 * get list of jobs
	 */
	static async read() {
		// fetch all jobs
		return await models.Job.findAll({
			attributes: ['title', 'salary_from', 'salary_to', 'experience_from', 'experience_to', 'description'],
			include: [models.Company, models.WorkingType, models.City, models.Role, models.Profession, models.Degree, models.Language, models.LanguageKnowledge]
		})
	}

	/**
	 * create job from company
	 */
	static async create(user_id, data) {
		// get auth user
		let user = await AuthService.authUser(user_id)
		// create job by user active company
		return await models.Job.create({
			company_id: user.activeCompany.id,
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
			description: data.description
		})
	}

	/**
	 * Delete job
	 */
	static async delete(id) {
		// get job by id
		let job = await models.Job.findByPk(id)
		// delete job
		return await job.destroy()
	}

	/**
	 * Set job requirements
	 */
	static async setJobRequirements(params) {
		return await models.JobRequirement.create({
			job_id: params.job_id,
			city: params.city,
			working_type: params.working_type,
			role: params.role,
			profession: params.profession,
			skills: params.skills,
			salary: params.salary,
			experience: params.experience,
			education: params.education,
			languages: params.languages
		})
	}
}

export default JobService
