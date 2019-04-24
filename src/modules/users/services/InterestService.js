import models from 'database/modelBootstrap'
import AuthService from '../services/AuthService'

class InterestService {
	/**
	 * Set role interest to user
	 */
	static async setRole(user_id, role_id) {
		// attach role to user result
		return await models.UserRole.create({ user_id, role_id })
	}

	/**
	 * Set Working Type interest to user
	 */
	static async setWorkingType(user_id, working_type_id) {
		// attach role to user result
		return await models.UserWorkingType.create({ user_id, working_type_id })
	}

	/**
	 * Set industry interest to user
	 */
	static async setIndustry(user_id, industry_id) {
		// attach role to user result
		return await models.UserIndustry.create({ user_id, industry_id })
	}

	/**
	 * Set profession interest to user
	 */
	static async setProfession(user_id, profession_id) {
		// attach role to user result
		return await models.UserProfession.create({ user_id, profession_id })
	}

	/**
	 * Set salary interest to user
	 */
	static async setSalary(user_id, salary_amount) {
		// get auth user instance
		let user = await AuthService.authUser(user_id)
		// attach role to user result
		return await user.createSalary({ user_id, salary_amount })
	}

	/**
	 * Get all user interest
	 */
	static async getInterests(user_id) {
		// get auth user instance
		let user = await AuthService.authUser(user_id)
		// fetch interests
		// get latest salary
		let salary = await models.Salary.findOne({
			limit: 1,
			where: { user_id },
			order: [['createdAt', 'DESC']]
		})
		// get latest role
		let [role] = await user.getUserRoles({
			limit: 1,
			where: { user_id },
			order: [['createdAt', 'DESC']],
			attributes: [],
			include: [models.Role]
		})
		// get latest profession
		let [profession] = await user.getUserProfessions({
			limit: 1,
			where: { user_id },
			order: [['createdAt', 'DESC']],
			attributes: [],
			include: [models.Profession]
		})
		// get latest industry
		let [industry] = await user.getUserIndustries({
			limit: 1,
			where: { user_id },
			order: [['createdAt', 'DESC']],
			attributes: [],
			include: [models.Industry]
		})
		// get latest working type
		let [workingType] = await user.getUserWorkingTypes({
			limit: 1,
			where: { user_id },
			order: [['createdAt', 'DESC']],
			attributes: [],
			include: [models.WorkingType]
		})

		// construct interest object
		// if  any interest does not exist return null
		// TODO: may need refactor
		let interests = {
			salary: salary ? salary : null,
			role: role ? role.role : null,
			profession: profession ? profession.profession : null,
			industry: industry ? industry.industry : null,
			workingType: workingType ? workingType.workingType : null
		}
		// return object
		return interests
	}
}

export default InterestService
