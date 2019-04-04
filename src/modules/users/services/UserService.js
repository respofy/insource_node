import models from 'database/modelBootstrap'
import ka from 'lang/ka'

/**
 * User Services
 */
class UserService {
	/**
	 * check the user by different criteria
	 */
	static async create(data) {
		return await models.User.create(data)
	}

	/**
	 * Update user data, filter by criteria and update by newValues
	 */
	static async update(criteria, newValues) {
		// find user
		let user = await models.User.findOne({ where: criteria })
		// update user password
		let updatedUser = await user.update(newValues)
		// validate process
		if (updatedUser === null) {
			throw new Error(ka.auth.user_not_updated)
		}

		return updatedUser
	}
}

export default UserService
