import response from 'helper/Response'
import AuthService from 'modules/users/services/AuthService'
import UserService from 'modules/users/services/UserService'
import ka from 'lang/ka'
import sms from 'helper/SmsHelper'
import models from 'database/modelBootstrap'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import {} from 'dotenv/config'
import moment from 'moment'

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
			await UserService.create(req.body, `${process.env.USER_AVATAR_PATH}/${req.file.filename}`)
			// response
			res.json(response.success(ka.auth.user_was_registered))
		} catch (err) {
			// response when error happens
			return res.json(response.error(err.message, {}, err))
		}
	}

	/**
	 * user authorization request handler
	 */
	static async authorization(req, res) {
		// TODO: change user find to service

		// get data from database
		const user = await models.User.findOne({
			where: {
				phone: req.body.phone
			}
		})
		// compare password
		if (user && bcrypt.compareSync(req.body.password, user.password)) {
			// get user companies
			const userCompanies = await user.getOwnedCompanies({
				// attributes: ['id'],
				raw: true
			})
			//user instance
			let userInstance = await AuthService.authUser(user.dataValues.id)
			// object for token
			let tokenInfo = {
				user: user.dataValues,
				companies: userCompanies
			}
			// generate token and save the user
			jwt.sign(tokenInfo, process.env.JWT_SECRET, (error, token) => {
				// generate response
				res.json(
					response.success(ka.tokenGenerated, {
						token,
						user: userInstance,
						companies: userCompanies
					})
				)
			})
			// set last login
			await user.update({
				last_login: moment.now()
			})
		} else {
			// not found response
			res.json(response.error(ka.tokenNotGenerated))
		}
	}

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
			// make code verify
			await AuthService.verify(req.body.phone, req.body.code)
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
	 * Return authorized user object
	 */
	static async getAuthUser(req, res) {
		try {
			// get instance
			let user = await models.User.findOne({
				where: {
					id: req.user.id
				},
				include: {
					model: models.UserProfession,
					where: {
						active: true
					},
					include: {
						model: models.Profession,
						required: false
					},
					required: false
				}
			})

			let companies = await user.getOwnedCompanies({
				raw: true
			})
			// return response
			return res.json(response.success(ka.request_success, { user, companies }))
		} catch (error) {
			return res.json(response.error(error.message))
		}
	}
}

// export class
export default AuthController
