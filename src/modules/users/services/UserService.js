import models from 'database/modelBootstrap'
import ka from 'lang/ka'

/**
 * User Services
 */
class UserService {
	/**
	 *  Get authorized user instance by id
	 */
	static async authUser(id) {
		return await models.User.findOne({
			where: { id },
			attributes: ['id', 'phone', 'name', 'surname', 'avatar', 'incognito', 'sleep', 'last_login', 'active_company_id'],
			include: [
				{
					model: models.Company,
					as: 'activeCompany',
					include: {
						model: models.Industry
					}
				}
			]
		})
	}

	/**
	 * Get active company
	 */
	static async getActiveCompany(user_id) {
		// get user instance
		let user = await this.authUser(user_id)
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
		let user = await UserService.authUser(user_id)
		// set city to the user
		return await user.setCity(city_id)
	}

	/**
	 * Set status in CV
	 */
	static async setStatus(user_id, status_id) {
		// get auth user
		let user = await UserService.authUser(user_id)
		// set status
		return await user.setStatus(status_id)
	}

	static async getFavoriteCompanies(user_id) {
		// get auth user
		let user = await UserService.authUser(user_id)
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
