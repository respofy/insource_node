import Jwt from 'jsonwebtoken'
import ka from 'lang/ka'
import response from 'helper/Response'
import {} from 'dotenv/config'

/**
 *  Middleware
 *  Validate json token and extend with User data
 */
export default (req, res, next) => {
	// Get token from headers
	let encryptedToken = req.get('Authorization')

	// Verify if token is valid
	let decryptedToken = Jwt.decode(encryptedToken)

	// filter companies by id
	let result = decryptedToken.companies.filter(company => company.id == req.params.company_id)

	// send error response if user does not belong requested company
	if (result.length === 0) {
		return res.json(response.error(ka.request_error, {}, 'Permission Denied (Active Company)'))
	} else {
		next()
	}
}
