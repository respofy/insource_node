import faker from 'faker'

class IndustryFactory {
	constructor() {
		this.title = 'Industry of ' + faker.fake('{{commerce.department}}'),
		this.publish = 1
	}
}

export default IndustryFactory
