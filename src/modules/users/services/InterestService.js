import models from 'database/modelBootstrap'
import UserService from '../services/UserService'

class InterestService {
	/**
	 * Fetch list of roles
	 */
	static async getRoles() {
		return await models.Role.findAll()
	}

	/**
	 * Fetch list of working types
	 */
	static async getWorkingTypes() {
		return await models.WorkingType.findAll()
	}

	/**
	 * Fetch list of industries
	 */
	static async getIndustries() {
		return await models.Industry.findAll()
	}

	/**
	 * Fetch list of professions
	 */
	static async getProfessions() {
		return await models.Profession.findAll()
	}

	/**
	 * Set role interest to user
	 */
	static async setRole(user_id, role_id) {
		// get auth user instance
		let user = await UserService.authUser(user_id)
		// attach role to user result
		return await user.setRoles(role_id)
	}

	/**
	 * Set Working Type interest to user
	 */
	static async setWorkingType(user_id, working_type_id) {
		// get auth user instance
		let user = await UserService.authUser(user_id)
		// attach role to user result
		return await user.setWorkingTypes(working_type_id)
	}

	/**
	 * Set industry interest to user
	 */
	static async setIndustry(user_id, industry_id) {
		// get auth user instance
		let user = await UserService.authUser(user_id)
		// attach role to user result
		return await user.setIndustries(industry_id)
	}

	/**
	 * Set profession interest to user
	 */
	static async setProfession(user_id, profession_id) {
		// get auth user instance
		let user = await UserService.authUser(user_id)
		// attach role to user result
		return await user.setProfessions(profession_id)
	}

	/**
	 * Set salary interest to user
	 */
	static async setSalary(user_id, salary_amount) {
		// get auth user instance
		let user = await UserService.authUser(user_id)
		// attach role to user result
		return await user.createSalary({ user_id, salary_amount })
	}

	/**
	 * Get all user interest
	 */
	static async getInterests(user_id) {
		// get auth user instance
		let user = await UserService.authUser(user_id)
		// fetch interests
		let salary = await models.Salary.findOne({
			limit: 1,
			where: { user_id },
			order: [['createdAt', 'DESC']]
		})
		let [role] = await user.getRoles()
		let [profession] = await user.getProfessions()
		let [industry] = await user.getIndustries()
		let [workingTypes] = await user.getWorkingTypes()
		// construct interest object
		let interests = {
			salary,
			role,
			profession,
			industry,
			workingTypes
		}
		// return object
		return interests
	}
}

export default InterestService
