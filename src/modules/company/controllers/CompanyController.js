import response from 'helper/Response'
import ka from 'lang/ka'
import UserService from '../../users/services/UserService'
import CompanyService from '../services/CompanyService'

class CompanyController {
	/**
	 *
	 */
	static async registration(req, res) {
		try {
			// create company from service
			let createdCompany = await CompanyService.register(req.user.id, req.body, req.file.path)
			// response
			res.json(response.success(ka.company.created, createdCompany))
		} catch (error) {
			// error responce
			res.json(response.error(ka.company.create_error, {}, error))
		}
	}

	/**
	 * Invite user by active company
	 */
	static async inviteUsers(req, res) {
		try {
			// invite users
			await CompanyService.inviteUsers(req.user.id, req.body)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 *
	 */
	static async searchCompaniesByName(req, res) {
		try {
			// get the roles form service
			let companies = await CompanyService.searchCompaniesByName(req.body.criteria)
			// return the responce
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

	/**
	 * Get active company
	 */
	static async getActiveCompany(req, res) {
		try {
			let activeCompany = await UserService.getActiveCompany(req.user.id)
			// response
			res.json(response.success(ka.request_success, activeCompany))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}

	/**
	 * Switch active company
	 */
	static async switchActiveCompany(req, res) {
		try {
			// switch user from service
			let switched = await CompanyService.switchActiveCompany(req.user.id, req.body.company_id)
			// return response
			res.json(response.success(ka.request_success, switched))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}
}

export default CompanyController
