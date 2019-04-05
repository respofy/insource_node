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
			await AuthService.ifUserNotExist({ phone: req.body.phone })
			// create code into database
			let code = await AuthService.generateUserActivationCode(req.body.phone)
			// send code to user
			await sms.send(req.body.phone, code)
			// response
			res.json(response.success(ka.auth.user_initialized_successfully))
		} catch (err) {
			// response when error happens
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
			// response
			res.json(response.success(ka.auth.user_resend_sms_successfully))
		} catch (err) {
			// response when error happens
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
			// response
			res.json(response.success(ka.auth.user_sms_verify_success))
		} catch (err) {
			// response when error happens
			return res.json(response.error(err.message))
		}
	}

	/**
	 * fill user data
	 */
	static async fillData(req, res) {
		try {
			// check if user is activated
			await AuthService.isActivated(req.body.phone)
			// create the user
			await UserService.create(req.body)
			// response
			res.json(response.success(ka.auth.user_was_registered))
		} catch (err) {
			// response when error happens
			return res.json(response.error(err.message))
		}
	}
}

export default AuthController
