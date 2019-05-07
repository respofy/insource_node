import Jwt from 'jsonwebtoken'
import {} from 'dotenv/config'
import Extend from 'extend'
import Response from 'helper/Response'
import ka from 'lang/ka'

/**
 *  Middleware
 *  Validate json token and extend with User data
 */
export default function verify(req, res, next) {
	// Get token from headers
	let token = req.get('Authorization')
	// Verify if token is valid
	Jwt.verify(token, process.env.JWT_SECRET, (error, authData) => {
		if (error) {
			res.json(Response.error(ka.middleware.not_authorize, {}, error))
		} else {
			// If token is valid extend Req object with user data
			Extend(req, { user: authData.user })
			Extend(req, { companies: authData.company })
			next()
		}
	})
}
