import CompanyService from '../modules/company/services/CompanyService'
import response from 'helper/Response'
import Extend from 'extend'
import ka from 'lang/ka'

/**
 *  Middleware
 *  Validates hash during invite process
 */
export default (req, res, next) => {
	// get hash
	let hash = req.body.hash
	// check if hash is valid and get extend req
	CompanyService.checkInviteHash(hash)
		.then(inviteHashRecord => {
			// extend request object with company id
			Extend(req, { company_id: inviteHashRecord.company_id })
			next()
		})
		.catch(() => {
			return res.json(response.error(ka.company.hash_error, {}, 'hash is required (InviteMiddleware)'))
		})
}
