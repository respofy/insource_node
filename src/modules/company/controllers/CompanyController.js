import responseHelper from 'helper/ResponseHelper'
import models from 'database/modelBootstrap'

class CompanyController {
	static async fillData(req, res) {
		let createdCompany = await models.Company.create(req.body)

		return createdCompany
			? res.json(responseHelper.success('Company has been created', createdCompany))
			: res.json(responseHelper.error('Error in company creation'))
	}

	static async invite(req, res) {
		return res.json('invite')
	}
}

export default CompanyController
