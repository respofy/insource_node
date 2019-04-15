import models from 'database/modelBootstrap'
import UserService from './UserService'

class WorkingExService {
	/**
	 * Get roles
	 */
	static async getRoles() {
		return await models.Role.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * Get professions
	 */
	static async getProfessions() {
		return await models.Profession.findAll({
			order: [['title', 'ASC']]
		})
	}

	/**
	 * Get skills
	 */
	static async getSkillsByProfession(id) {
		//profession_id
		let profession = await models.Profession.findByPk(id)
		// return the skills by profession
		return profession.getSkills()
	}

	/**
	 * Create working experience
	 */
	static async create(user_id, params) {
		// create item
		let newWorkingExp = await models.UserWorkingExperience.create({
			started_at: params.started_at,
			finished_at: params.finished_at,
			company_name: params.company.name,
			company_id: params.company.id,
			user_id: user_id,
			profession_id: params.profession_id,
			role_id: params.role_id
		})
		// craete skill record if id equals null
		params.skills.forEach(async item => {
			// check if item does not have id
			if (item.id == null) {
				let skill = await models.Skill.create({
					title: item.title
				})
				// after create skill record relate the record to profession
				// get profession instance
				let profession = await models.Profession.findByPk(params.profession_id)
				// attach skill to profession
				await profession.addSkill(skill.id)
				// associate new skill with user working experience
				await newWorkingExp.addSkill(skill.id)
			}
			// associate existing skill with user working experience
			await newWorkingExp.addSkill(item.id)
		})
		// TODO: write all skill ids into working ex
	}

	/**
	 * Get all working experience
	 */
	static async getAll(userId) {
		// get auth user
		let user = await UserService.authUser(userId)
		// read user working experiences
		return await user.getUserWorkingExperiences()
	}

	/**
	 * update working experience
	 */
	static async update(id, requestBody) {
		// get working experience by id
		let workingExp = await models.UserWorkingExperience.findOne({ where: { id } })
		// update working experience
		let updatedWorkingExp = await workingExp.update(requestBody)
		// throw error on negative result
		if (updatedWorkingExp === null) {
			throw new Error()
		}
		// return updated record
		return updatedWorkingExp
	}

	/**
	 * delete working experience
	 */
	static async delete(id) {
		// get working experience by id
		let workingExp = await models.UserWorkingExperience.findOne({ where: { id } })
		// delete working experience
		return await workingExp.destroy()
	}
}

export default WorkingExService
