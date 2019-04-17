import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import sequelize from 'sequelize'

const operator = sequelize.Op

/**
 *
 */
class AuthService {
	/**
	 * check the user by different criteria, turns True if doesn't exist
	 */
	static async ifUserNotExist(criteria) {
		// find user in database and return
		let user = await models.User.findOne({
			where: criteria
		})
		if (user !== null) throw new Error(ka.auth.user_found)
		else return user
	}

	/**
	 * check the user by different criteria, turns True if exists
	 */
	static async ifUserExist(criteria) {
		// find user in database and return
		let user = await models.User.findOne({
			where: criteria
		})
		if (user === null) throw new Error(ka.auth.user_not_found)
		else return user
	}

	/**
	 * generate user activation code and update or insert into database
	 */
	static async generateUserActivationCode(phone) {
		// generate 4 digit code
		let code = Math.floor(1000 + Math.random() * 9000)
		// create or update activation table
		await models.Activation.upsert({
			phone: phone,
			code: code,
			activated: 0
		})
		// response
		return code
	}

	/**
	 * verify sms
	 */
	static async verify(phone, code) {
		// find record into database
		let activationRecord = await models.Activation.findOne({
			where: {
				[operator.and]: {
					phone: phone,
					code: code,
					activated: 0
				}
			}
		})
		// check if record does not exist throw new exception
		if (activationRecord === null) throw new Error(ka.auth.verify_code_not_correct)
		// update the record
		await activationRecord.update({ activated: 1 })
	}

	/**
	 * Validate image upload
	 */
	static async validateImage(image) {
		if (!image) {
			throw new Error(ka.auth.avatar_required)
		}
		// validate size
		if (image.size > 1000000) {
			throw new Error(ka.auth.avatar_size_error)
		}
		return image.path
	}

	/**
	 * check if user is activated or not
	 */
	static async isActivated(phone) {
		let activatedRow = await models.Activation.findOne({
			where: {
				phone: phone
			}
		})

		if (activatedRow === null || activatedRow.activated == 0) {
			throw new Error(ka.auth.user_not_activated)
		}
	}
}

export default AuthService
