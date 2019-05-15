import faker from 'faker'

class ProfessionFactory {
	constructor() {
		this.title = 'Profession of ' + faker.fake('{{name.jobArea}}')
	}
}

export default ProfessionFactory
