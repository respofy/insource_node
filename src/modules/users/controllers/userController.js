import models from 'modules/users/models'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import responseHelper from 'helper/responseHelper'
import ka from 'lang/ka'
import jwtConfig from 'config/jwt'

class userController {
	/**
	 * user authorization request hendler
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
				// generate responce
				res.json(responseHelper.success(ka.tokenGenerated, { token }))
			})
		} else {
			// not found responce
			res.json(responseHelper.error(ka.tokenNotGenerated))
		}
	}

	/**
	 * user registration
	 */
	static async registration(req, res) {
		// validation
		// registration
		try {
			const user = await models.user.create({
				phone: req.body.phone,
				name: 'anri',
				surname: 'oboladze',
				password: bcrypt.hashSync(req.body.password, 10)
			})
			// console.log(err)
			return res.json(user)
		} catch (error) {
			return res.json(error)
		}

		// .then(function(item) {
		// 	// test max validation
		// 	// item.updateAttributes({ amount: 100000 })
		// 	res.send('registration')
		// })
		// .catch(function(err) {
		// 	// doesn't catch anything
		// 	res.send(err.errors)
		// })

		// jwt.sign({ username: 'anri' }, 'secretkey', (error, token) => {
		// 	return res.json({ token })
		// })
	}

	static async fillData(req, res) {
		// ToDo validate sms code 
		let status = true

		if (status === false) {
			return res.json(responseHelper.error(ka.invalidSmsCode))
		}
		// remove activation code
		delete req.body.activationCode
		// hash password
		req.body.password = bcrypt.hashSync(req.body.password, 10)

		console.log(req.body)
		try {
			const user = await models.user.create(req.body)
			
			return res.json(responseHelper.success("user has been created", user))
		} catch (error) {
			return res.json(responseHelper.error(error.errors[0].message))
		}

	}
}

export default userController
