import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import AuthService from '../services/AuthService'

/**
 * User Services
 */
class UserService {
	/**
	 * add user working experience
	 */
	static async addWorkingExperience(user_id, params) {
		// create working experience item
		let newWorkingExp = await models.UserWorkingExperience.create({
			started_at: params.started_at,
			finished_at: params.finished_at,
			company_name: params.company.name,
			company_id: params.company.id,
			user_id: user_id,
			profession_id: params.profession_id,
			role_id: params.role_id
		})
		// create skill record if id equals null
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
	}

	/**
	 * update working experience
	 */
	// eslint-disable-next-line no-unused-vars
	static async updateWorkingExperience(id, requestBody) {
		// // get working experience by id
		// let workingExp = await models.UserWorkingExperience.findOne({ where: { id } })
		// // update working experience
		// let updatedWorkingExp = await workingExp.update(requestBody)
		// // throw error on negative result
		// if (updatedWorkingExp === null) {
		// 	throw new Error()
		// }
		// // return updated record
		// return updatedWorkingExp
	}

	/**
	 * delete working experience
	 */
	static async deleteWorkingExperience(id, user_id) {
		// get working experience by id
		let workingExp = await models.UserWorkingExperience.findOne({ where: { id, user_id } })
		// delete working experience
		return await workingExp.destroy()
	}

	/**
	 * Get all working experience
	 */
	static async listWorkingExperiences(userId) {
		// get auth user
		let user = await AuthService.authUser(userId)
		// read user working experiences
		return await user.getUserWorkingExperiences({
			attributes: ['id', 'started_at', 'finished_at', 'company_name'],
			include: [models.Role, models.Company, models.Profession]
		})
	}

	/** -------------------------------------------------------------------- */

	/**
	 * add language to user
	 */
	static async addLanguage(userId, data) {
		// get auth user
		let user = await AuthService.authUser(userId)
		// add auth user in body
		data.user_id = userId
		// create working experience
		return await user.createUserLanguage(data)
	}

	/**
	 * Update user language
	 */
	static async updateLanguage(id, user_id, data) {
		// get working experience by id
		let userLanguage = await models.UserLanguage.findOne({ where: { id, user_id } })
		// update working experience
		let updatedUserLanguage = await userLanguage.update(data)
		// throw error on negative result
		if (updatedUserLanguage === null) {
			throw new Error()
		}
		// return updated record
		return updatedUserLanguage
	}

	/**
	 * delete user language
	 */
	static async deleteLanguage(id, user_id) {
		// get working experience by id
		let userLanguage = await models.UserLanguage.findOne({ where: { id, user_id } })
		// check result
		if (userLanguage === null) {
			throw new Error()
		}
		// delete working experience
		return await userLanguage.destroy()
	}

	/**
	 * Read all user languages
	 */
	static async readLanguages(userId) {
		// get auth user
		let user = await AuthService.authUser(userId)
		// read user working experiences
		return await user.getUserLanguages({
			attributes: ['id'],
			include: [models.Language, models.LanguageKnowledge]
		})
	}

	/** -------------------------------------------------------------------- */

	/**
	 * Get active company
	 */
	static async getActiveCompany(user_id) {
		// get user instance
		let user = await models.User.findByPk(user_id)
		// get active company id
		return await models.Company.findByPk(user.active_company_id)
	}

	/**
	 * check the user by different criteria
	 */
	static async create(data) {
		return await models.User.create(data)
	}

	/**
	 * Update user data, filter by criteria and update by newValues
	 */
	static async update(criteria, values) {
		// find user
		let user = await models.User.findOne({ where: criteria })
		// update user password
		let updatedUser = await user.update(values)
		// validate process
		if (updatedUser === null) {
			throw new Error(ka.auth.user_not_updated)
		}
		return updatedUser
	}

	/**
	 * Set city in CV
	 */
	static async setCity(user_id, city_id) {
		// get auth user
		let user = await AuthService.authUser(user_id)
		// set city to the user
		return await user.setCity(city_id)
	}

	/**
	 * Set status in CV
	 */
	static async setStatus(user_id, status_id) {
		// get auth user
		let user = await AuthService.authUser(user_id)
		// set status
		return await user.setStatus(status_id)
	}

	/**
	 *
	 */
	static async getFavoriteCompanies(user_id) {
		// get auth user
		let user = await AuthService.authUser(user_id)
		// return favorite companies
		return await user.getFavoriteCompanies({
			attributes: ['id', 'name', 'logo', 'identification_code'],
			include: [models.Industry]
		})
	}

	/**
	 * Add company to favorites
	 */
	static async addCompanyToFavorites(user_id, company_id) {
		// get auth user instance
		let user = await models.User.findByPk(user_id)
		// add company to favorites by company_id
		return await user.addFavoriteCompany(company_id)
	}

	/**
	 * Remove company from favorites
	 */
	static async removeCompanyFromFavorites(user_id, company_id) {
		// get auth user instance
		let user = await models.User.findByPk(user_id)
		// remove company to favorites by company_id
		return await user.removeFavoriteCompany(company_id)
	}
}

export default UserService
