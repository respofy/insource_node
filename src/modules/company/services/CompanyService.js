import models from 'database/modelBootstrap'
import ka from 'lang/ka'
import jwt from 'jsonwebtoken'
import sequelize from 'sequelize'

const operator = sequelize.Op

/**
 * company service
 */
class CompanyService {
	/**
	 * Fill company data
	 */
	static async register(user_id, data, image_path) {
		// create company from service
		let createdCompany = await models.Company.create({
			name: data.name,
			industry_id: data.industry_id,
			identification_code: data.identification_code,
			logo: image_path
		})
		// attach user to owners
		await createdCompany.addOwner(user_id)
		// return result
		return createdCompany
	}

	/**
	 * Generate new token after company registration
	 */
	static async newCompanyToken(req, created_company) {
		// push new company inside request.companies
		req.companies.push({ id: created_company.id })
		// new object for token
		let newToken = {
			user: req.user,
			companies: req.companies
		}
		// sign and return new token
		return jwt.sign(newToken, process.env.JWT_SECRET)
	}

	/**
	 * Invite user in company by active company id
	 */
	static async inviteUsers(company_id, user_phones) {
		// get active company instance
		let activeCompany = await models.Company.findByPk(company_id)
		// loop through phones, returns array of promises
		let mapPromises = user_phones.map(async phone => {
			// find user
			let invitedUser = await models.User.findOne({
				where: { phone }
			})
			// if doest exists throw error
			if (invitedUser === null) {
				throw new Error(ka.phone_not_found(phone))
			}
			// return invited user id as promise
			return invitedUser.id
		})
		// await all promise returned by map
		let candidates = await Promise.all(mapPromises)
		// invite users on positive result
		return await activeCompany.addOwners(candidates)
	}

	/**
	 * Search companies by name (criteria)
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
