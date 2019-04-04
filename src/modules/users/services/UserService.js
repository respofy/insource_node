import models from 'database/modelBootstrap'
// import ka from 'lang/ka'
// import sequelize from 'sequelize'

// const operator = sequelize.Op

/**
 *
 */
class UserService {
	/**
	 * check the user by different criteria
	 */
	static async create(data) {
		return await models.User.create(data)
	}
}

export default UserService
