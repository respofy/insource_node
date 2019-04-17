import response from 'helper/Response'
import ka from 'lang/ka'
import models from 'database/modelBootstrap'
import UserService from '../../users/services/UserService'
import CompanyService from '../services/CompanyService'

class CompanyController {
	static async fillData(req, res) {
		let createdCompany = await models.Company.create(req.body)
		return createdCompany ? res.json(response.success('Company has been created', createdCompany)) : res.json(response.error('Error in company creation'))
	}

	static async invite(req, res) {
		return res.json('invite')
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
