import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import sequelize from 'sequelize'
import UserService from '../../users/services/UserService'

const operator = sequelize.Op

/**
 *
 */
class CompanyService {
	/**
	 * Fill company data
	 */
	static async register(user_id, data) {
		// create company from service
		let createdCompany = await models.Company.create(data)
		// attach user to owners
		await createdCompany.addOwner(user_id)
		// return result
		return createdCompany
	}

	/**
	 * Invite user in company
	 */
	static async invite(user_id, invited_users) {
		// get user active company
		let activeCompany = await UserService.getActiveCompany(user_id)
		// loop through invited user phones

		invited_users.forEach(async phone => {
			// get invited user instance
			let invitedUser = await models.User.findOne({ where: { phone } })
			// if user has not found thow Error
			if (invitedUser === null) {
				throw new Error('მომხმარებელი ნომრით ' + phone + ' არ მოიძებნა')
			}
			// add in company
			await activeCompany.addOwner(invitedUser.id)
		})
	}

	/**
	 * Validate logo
	 */
	static async validateLogo(logo) {
		if (!logo) {
			throw new Error(ka.auth.logo_required)
		}
		// validate size
		if (logo.size > 1000000) {
			throw new Error(ka.auth.logo_size_error)
		}
		return logo.path
	}

	/**
	 *
	 */
	static async searchCompaniesByName(criteria) {
		// get list of companies
		let companies = await models.Company.findAll({
			where: {
				name: {
					[operator.like]: `%${criteria}%`
				}
			}
		})
		// response
		return companies
	}

	/**
	 * Switch active company
	 */
	static async switchActiveCompany(user_id, company_id) {
		// get user instance
		let user = await models.User.findByPk(user_id)
		// validate ownership
		let ownership = await user.hasOwnedCompany(company_id)
		// throw error if validation fails
		if (ownership === false) {
			throw new Error()
		}
		// update user record in db
		return await user.update({ active_company_id: company_id })
	}

	/**
	 * Get list of companies that user owns
	 */
	static async getUserOwnedCompanies(user_id) {
		// get user instance
		let user = await models.User.findByPk(user_id)
		// returns result
		return await user.getOwnedCompanies()
	}
}

export default CompanyService
