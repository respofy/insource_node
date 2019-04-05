import models from 'database/modelBootstrap'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import response from 'helper/Response'
import ka from 'lang/ka'
import jwtConfig from 'config/jwt'
import sms from 'helper/SmsHelper'
import AuthService from '../services/AuthService'
import UserService from '../services/UserService'

/**
 *
 */
class UserController {
	/**
	 * user authorization request handler
	 */
	static async authorization(req, res) {
		// get data from database
		const user = await models.User.findOne({
			where: {
				phone: req.body.phone
			}
		})
		// compare password
		if (user && bcrypt.compareSync(req.body.password, user.password)) {
			// generate token and save the user
			jwt.sign(user.dataValues, jwtConfig.secret, (error, token) => {
				// generate response
				res.json(response.success(ka.tokenGenerated, { token }))
			})
		} else {
			// not found response
			res.json(response.error(ka.tokenNotGenerated))
		}
	}

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
}

export default UserController
