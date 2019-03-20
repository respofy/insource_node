import models from './../models'

class userController {
	/**
	 * user authorization request hendler
	 */
	static authorization(req, res) {
		return res.send('test2')
	}
	/**
	 * user registration
	 */
	static registration(req, res) {
		models.test.findAll().then(result => {
			console.log(result)
		})

		return res.send('registration')
	}
}

export default userController
