import models from 'database/modelBootstrap'
import sequelize from 'sequelize'
import ka from 'lang/ka'

const operator = sequelize.Op
/**
 *
 */
class CompanyService {
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
		// responce
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
