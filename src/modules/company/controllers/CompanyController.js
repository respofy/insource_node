import response from 'helper/Response'
import ka from 'lang/ka'
import CompanyService from '../services/CompanyService'
import sms from 'helper/SmsHelper'
import AuthService from 'modules/users/services/AuthService'
import UserService from 'modules/users/services/UserService'
import models from 'database/modelBootstrap'

class CompanyController {
	/**
	 * Register new company, generates new token after registration
	 */
	static async registration(req, res) {
		try {
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
			let inviteResult = await CompanyService.inviteUsers(req.body.params.company_id, req.body.emails)
			// response
			res.json(response.success(ka.request_success, inviteResult))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * check hash during invite
	 */
	static async checkInviteHash(req, res) {
		try {
			// check hash from service
			let inviteHash = await CompanyService.checkInviteHash(req.body.hash)
			// response
			res.json(response.success(ka.request_success, inviteHash))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Initialize company join flow
	 */
	static async initCompanyJoin(req, res) {
		try {
			// generate code for sms
			let code = await AuthService.generateUserActivationCode(req.body.phone)
			// send code to user
			await sms.send(req.body.phone, code)
			// response
			res.json(response.success(ka.request_success))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	/**
	 * Verify candidate phone and add in company if exists in users, if not, return false
	 */
	static async verifyCompanyJoin(req, res) {
		try {
			// verify from service
			let verification = await CompanyService.verifyCompanyJoin(req.body.phone, req.body.code, req.company_id)
			// response
			res.json(response.success(ka.request_success, verification))
		} catch (error) {
			res.json(response.error(error.message))
		}
	}

	static async createUserInCompany(req, res) {
		try {
			// check if user is active
			await AuthService.isActivated(req.body.phone)
			// create new user from service
			let newUser = await UserService.create(req.body, `${process.env.USER_AVATAR_PATH}/${req.file.filename}`)
			// fetch company
			let company = await models.Company.findByPk(req.company_id)
			// invite new user
			await company.addOwners(newUser.id)
			// deactivate phone
			await AuthService.deactivateUserPhone(req.body.phone)
			// response
			res.json(response.success(ka.auth.user_created))
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
			let companies = await CompanyService.searchCompaniesByName(req.body.criteria, req.user.id)
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

	/**
	 * Get left stats of company
	 */
	static async leftStats(req, res) {
		try {
			// fetch companies from service
			let companies = await CompanyService.leftStats(req.body.params.company_id)
			// response
			res.json(response.success(ka.request_success, companies))
		} catch (error) {
			res.json(response.error(ka.request_error))
		}
	}
}

export default CompanyController
