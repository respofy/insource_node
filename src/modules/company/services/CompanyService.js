import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import sequelize from 'sequelize'
// import UserService from '../../users/services/UserService'
import AuthService from '../../users/services/AuthService'

const operator = sequelize.Op

/**
 * company service
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
		// TODO: services needs to be adjusted
		let activeUser = await AuthService.authUser(user_id)
		let activeCompany = await models.Company.findByPk(activeUser.active_company_id)
	
		/**
		 * check users in db
		 */
		async function validateAndInvite() {
			// prepare array for candidates
			let candidates = []
			// loop provided phones
			let promises = await invited_users.map(async phone => {
				// validate in db
				let invitedUser = await models.User.findOne({ where: { phone } })
				// if doest exists return rejected promise
				if (invitedUser === null) {
					throw new Error('მომხმარებელი ნომრით ' + phone + ' არ იქნა ნამოვნი')
				}
				// if exists push in candidates
				candidates.push(invitedUser.id)
			})

			// return resolved promise
			return await Promise.all(promises).then(() => {
				// add users after all promise resolves
				activeCompany.addOwners(candidates)
			})
		}

		try {
			await validateAndInvite()
		} catch (error) {
			throw new Error(error.message)
		}
	}

	/**
	 * Validate logo
	 */
	static async validateLogo(logo) {
		if (!logo) {
			throw new Error(ka.auth.logo_required)
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
