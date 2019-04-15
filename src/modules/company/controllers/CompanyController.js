import response from 'helper/Response'
import models from 'database/modelBootstrap'

class CompanyController {
	static async fillData(req, res) {
		let createdCompany = await models.Company.create(req.body)
		return createdCompany ? res.json(response.success('Company has been created', createdCompany)) : res.json(response.error('Error in company creation'))
	}

	static async invite(req, res) {
		return res.json('invite')
	}
}

export default CompanyController
