import models from 'database/modelBootstrap'
import sequelize from 'sequelize'

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
}
export default CompanyService
