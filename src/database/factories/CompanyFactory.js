import faker from 'faker'
import generator from 'helper/Generator'

class CompanyFactory {
	constructor() {
		this.name = faker.fake('{{company.companyName}}')
		this.industry_id = generator.getRandomInteger(1, 5)
		this.logo = faker.fake('{{image.business}}')
		this.identification_code = generator.getRandomString(9, 'numeric')
	}
}

export default CompanyFactory
