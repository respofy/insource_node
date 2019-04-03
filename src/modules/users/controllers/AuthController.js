import response from 'helper/Response'
import AuthService from 'modules/users/services/AuthService'
import UserService from 'modules/users/services/UserService'
import ka from 'lang/ka'
import sms from 'helper/SmsHelper'

/**
 * @description class to make user registration and authorization
 *
 */

class AuthController {
	/**
	 * registration step one
	 */
	static async initialize(req, res) {
		try {
			// check if user exist
			await AuthService.ifUserExist({ phone: req.body.phone })
			// create code into database
			let code = await AuthService.generateUserActivationCode(req.body.phone)
			// send code to user
			await sms.send(req.body.phone, code)
			// responce
			res.json(response.success(ka.auth.user_initialized_successfully))
		} catch (err) {
			// responce when error happens
			return res.json(response.error(err.message))
		}
	}

	/**
	 * registration step one
	 */
	static async resendSMS(req, res) {
		try {
			// create code into database
			let code = await AuthService.generateUserActivationCode(req.body.phone)
			// send code to user
			await sms.send(req.body.phone, code)
			// responce
			res.json(response.success(ka.auth.user_resend_sms_successfully))
		} catch (err) {
			// responce when error happens
			return res.json(response.error(err.message))
		}
	}

	/**
	 * registration step one
	 */
	static async verify(req, res) {
		try {
			// make code verify
			await AuthService.verify(req.body.phone, req.body.code)
			// responce
			res.json(response.success(ka.auth.user_resend_sms_successfully))
		} catch (err) {
			// responce when error happens
			return res.json(response.error(err.message))
		}
	}

	/**
	 *
	 */
	static async fillData(req, res) {
		try {
			// check if user is activated
			await AuthService.isActivated(req.body.phone)
			// create the user
			await UserService.create(req.body)
			// responce
			res.json(response.success(ka.auth.user_was_registered))
		} catch (err) {
			// responce when error happens
			return res.json(response.error(err.message))
		}

		// hash password
		// req.body.password = bcrypt.hashSync(req.body.password, 10)

		// try {
		// 	const user = await models.User.create(req.body)

		// 	return res.json(responseHelper.success('user has been created', user))
		// } catch (error) {
		// 	return res.json(responseHelper.error(error.errors[0].message))
		// }
	}
}

export default AuthController
