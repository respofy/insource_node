import models from 'modules/users/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import responseHelper from 'helper/responseHelper'
import ka from 'lang/ka'
import jwtConfig from 'config/jwt'
import activationService from '../services/activationService'
import passwordResetService from '../services/passwordResetService'

class userController {
	/**
	 * user authorization request handler
	 */
	static async authorization(req, res) {
		// get data from database
		const user = await models.user.findOne({
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

	static async initialize(req, res) {
		// find user with phone
		let user = await models.user.findOne({
			where: {
				phone: req.body.phone
			}
		})

		if (req.body.password !== req.body.c_password) {
			return res.json(responseHelper.error('პაროლები უნდა ემთხვეოდეს ერთმანეთს'))
		}

		//if user exists return error message
		if (user !== null) {
			return res.json(responseHelper.error('მსგავსი მეილით ანგარიში უკვე არსებობს'))
		}

		// Send sms to user
		let activation = await activationService.requestCode(req.body.phone)

		if (activation === true) {
			return res.json(responseHelper.success("Message sent"))
		} else {
			return res.json(responseHelper.success("Message was not sent, check phone and try again"))
		}
	}

	static async verify(req, res) {
		// verify sms code
		let SmsServicePromise = await activationService.verify(req.body.phone, req.body.activationCode)

		if (SmsServicePromise == false) {
			return res.json(responseHelper.error("SMS code is wrong or expired"))
		}

		return res.json(responseHelper.success("SMS has been verified"))
	}

	static async sendSms(req, res) {
		// resend sms with activationService
		let resentSmsStatus = await activationService.requestCode(req.body.phone)

		return resentSmsStatus
			? res.json(responseHelper.success("SMS has been sent"))
			: res.json(responseHelper.error("SMS has not been sent"))
	}

	static async fillData(req, res) {
		// validate sms code 
		let status = await activationService.validate(req.body.phone, req.body.activationCode)

		if (status === false) {
			return res.json(responseHelper.error(ka.invalidSmsCode))
		}
		// remove activation code
		delete req.body.activationCode
		// hash password
		req.body.password = bcrypt.hashSync(req.body.password, 10)

		try {
			const user = await models.user.create(req.body)

			return res.json(responseHelper.success("user has been created", user))
		} catch (error) {
			return res.json(responseHelper.error(error.errors[0].message))
		}
	}

	static async resetPassword(req, res) {
		let resetStatus = await passwordResetService.reset(req.body.phone, req.body.password, req.body.activationCode)

		return resetStatus
			? res.json(responseHelper.success("Password has been reset"))
			: res.json(responseHelper.error("Password has not been reset"))
	}
}

export default userController
