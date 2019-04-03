import models from 'database/modelBootstrap'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import responseHelper from 'helper/Response'
import ka from 'lang/ka'
import jwtConfig from 'config/jwt'
import activationService from '../services/ActivationService'
import passwordResetService from '../services/PasswordResetService'

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
				res.json(responseHelper.success(ka.tokenGenerated, { token }))
			})
		} else {
			// not found response
			res.json(responseHelper.error(ka.tokenNotGenerated))
		}
	}

	static async resetInit(req, res) {
		let checkUser = await models.User.findOne({
			where: { phone: req.body.phone }
		})

		if (checkUser == null) {
			return res.json(responseHelper.error('ანგარიში მსგავსი ნომრით არ არსებობს'))
		}

		let activationStatus = await activationService.requestCode(req.body.phone)

		return activationStatus
			? res.json(responseHelper.success('Message has been sent'))
			: res.json(responseHelper.error('Message has not been sent'))
	}

	static async resetPassword(req, res) {
		let resetStatus = await passwordResetService.reset(req.body.phone, req.body.password, req.body.activationCode)

		return resetStatus
			? res.json(responseHelper.success('Password has been reset'))
			: res.json(responseHelper.error('Password has not been reset'))
	}
}

export default UserController
