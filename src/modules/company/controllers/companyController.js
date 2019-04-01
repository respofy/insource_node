import responseHelper from 'helper/responseHelper'
import models from 'database/modelBootstrap'

class companyController {
	static async fillData(req, res) {
		let createdCompany = await models.company.create(req.body)

		return createdCompany
			? res.json(responseHelper.success('Company has been created', createdCompany))
			: res.json(responseHelper.error('Error in company creation'))
	}

	static async invite(req, res) {
		return res.json('invite')
	}
}

export default companyController
