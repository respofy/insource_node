import bcrypt from 'bcrypt'
import response from 'helper/Response'
import ka from 'lang/ka'
import sms from 'helper/SmsHelper'
import models from 'database/modelBootstrap'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

/**
 *
 */
class UserController {
	/**
	 * Initialize password reset
	 */
	static async initializePasswordReset(req, res) {
		try {
			// check user existence
			await AuthService.ifUserExist({ phone: req.body.phone })
			let code = await AuthService.generateUserActivationCode(req.body.phone)
			// send code to user
			await sms.send(req.body.phone, code)
			// send sms
			await sms.send()
			// response
			res.json(response.success(ka.auth.user_password_reset_initialized))
		} catch (error) {
			// response when error happens
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Reset password
	 */
	static async resetPassword(req, res) {
		try {
			// check if user is activated
			await AuthService.isActivated(req.body.phone)
			// hash new password
			let hashedPassword = bcrypt.hashSync(req.body.password, 10)
			// find by phone and update user password
			await UserService.update({ phone: req.body.phone }, { password: hashedPassword })
			// response
			res.json(response.success(ka.auth.user_password_reset))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}

	/**
	 * Get list of cities
	 */
	static async getCities(req, res) {
		// get list of cities
		let cities = await models.City.findAll()
		// response
		res.json(response.success(ka.request_success, cities))
	}

	/**
	 * Set city in CV by id
	 */
	static async setCity(req, res) {
		try {
			// set city from user service
			await UserService.setCity(req.user.id, req.body.id)
			// response
			res.json(response.success(ka.cv.city_updated))
		} catch (error) {
			return res.json(response.error(ka.cv.city_not_updated))
		}
	}

	/**
	 * Get list of statuses
	 */
	static async getStatuses(req, res) {
		// get list of statuses
		let statuses = await models.Status.findAll()
		// response
		res.json(response.success(ka.request_success, statuses))
	}

	/**
	 * Set status in CV by id
	 */
	static async setStatus(req, res) {
		try {
			// set status from user service
			await UserService.setStatus(req.user.id, req.body.id)
			// response
			res.json(response.success(ka.cv.status_updated))
		} catch (error) {
			return res.json(response.error(ka.cv.status_not_updated))
		}
	}
}

export default UserController
