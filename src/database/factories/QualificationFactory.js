import faker from 'faker'

class QualificationFactory {
	constructor() {
		this.title = 'Qualification of ' + faker.fake('{{company.catchPhrase}}')
	}
}

export default QualificationFactory
