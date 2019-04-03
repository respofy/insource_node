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
		await models.User.create({
			phone: data.phone,
			name: data.name,
			surname: data.surname,
			password: data.password,
			gender: data.gender,
			avatar: data.avatar,
			birthday: data.birthday,
			active: data,
			sleep: data,
			email: data.email
		})
	}
}

export default UserService
