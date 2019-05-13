import faker from 'faker'

class ProfessionFactory {
	constructor() {
		this.title = faker.fake('{{name.jobArea}}')
	}
}

export default ProfessionFactory
