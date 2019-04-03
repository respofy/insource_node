import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import sequelize from 'sequelize'

const operator = sequelize.Op

/**
 *
 */
class AuthService {
	/**
	 * check the user by different criteria
	 */
	static async ifUserExist(criteria) {
		// find user in database and return
		let user = await models.User.findOne({
			where: criteria
		})
		if (user !== null) throw new Error(ka.auth.user_found)
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
		// responce
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