// import AuthService from '../../users/services/AuthService'
import models from 'database/modelBootstrap'
import moment from 'moment'

/**
 * job service
 */
class JobService {
	/**
	 * get list of jobs, filtered by company_id and active_status
	 */
	static async read(company_id, active_status = 1) {
		// fetch all jobs
		return await models.Job.findAll({
			where: { company_id, active: active_status },
			attributes: ['id', 'title', 'salary_from', 'salary_to', 'experience_from', 'experience_to', 'description'],
			include: [
				{ model: models.Company, attributes: ['id', 'name', 'logo'] },
				{ model: models.WorkingType, attributes: ['id', 'title'] },
				{ model: models.City, attributes: ['id', 'name'] },
				{ model: models.Role, attributes: ['id', 'title'] },
				{ association: 'jobSkill', through: { attributes: [] } },
				{ model: models.Profession, attributes: ['id', 'title'] },
				{ model: models.Degree, attributes: ['id', 'title'] },
				{ model: models.Language, attributes: ['id', 'title'] },
				{ model: models.LanguageKnowledge, attributes: ['id', 'title', 'weight'] }
			]
		})
	}

	/**
	 * create job from active company
	 */
	static async create(user_id, company_id, data) {
		// create job by user active company
		let newJob = await models.Job.create({
			company_id: company_id,
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

		/* ---- Creates skill if not exist ( old code) -- */
		// loop through skills
		// data.skills.forEach(async skill => {
		// if skill does not exist in db, create new one and associate with profession & job
		// if (skill.id == null) {
		// 	// create new skill
		// 	let newSkill = await models.Skill.create({
		// 		title: skill.title
		// 	})
		// 	// get profession instance
		// 	let profession = await models.Profession.findByPk(data.profession_id)
		// 	// attach new skill to profession
		// 	await profession.addSkill(newSkill.id)
		// 	// attach skills to job
		// 	await newJob.addJobSkill(newSkill.id)
		// }

		// if exists, attach skills to job
		// await newJob.addJobSkill(skill.id)
		// })
		/* ------------------------------------------------ */

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
