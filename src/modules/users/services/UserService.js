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
		return await models.User.findOne({ where: { id } })
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
}

export default UserService
