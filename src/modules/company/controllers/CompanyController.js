import response from 'helper/Response'
import ka from 'lang/ka'
import CompanyService from '../services/CompanyService'

class CompanyController {
	/**
	 * Register new company, generates new token after registration
	 */
	static async registration(req, res) {
		try {
            console.log(req.body)
			// create company from service
			let createdCompany = await CompanyService.register(req.user.id, req.body, `${process.env.COMPANY_LOGO_PATH}/${req.file.filename}`)
			// get new token after creating company
			let newToken = await CompanyService.newCompanyToken(req, createdCompany)
			// response
			res.json(response.success(ka.company.created, { token: newToken, company: createdCompany }))
		} catch (error) {
			// error response
			res.json(response.error(ka.company.create_error, {}, error.message))
		}
	}

	/**
	 * Invite user by active company
	 */
	static async inviteUsers(req, res) {
		try {
			// invite users
			await CompanyService.inviteUsers(req.params.company_id, req.body)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Search companies by name (criteria)
	 */
	static async searchCompaniesByName(req, res) {
		try {
			// get the roles form service
			let companies = await CompanyService.searchCompaniesByName(req.body.criteria)
			// return the response
			res.json(response.success(ka.request_success, companies))
		} catch (error) {
			res.json(response.success(ka.request_error))
		}
	}

	/**
	 * Get list of companies that user owns
	 */
	static async getUserOwnedCompanies(req, res) {
		try {
			// fetch companies from service
			let companies = await CompanyService.getUserOwnedCompanies(req.user.id)
			// response
			res.json(response.success(ka.request_success, companies))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}
}

export default CompanyController
