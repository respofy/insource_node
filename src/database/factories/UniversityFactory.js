import faker from 'faker'

class UniversityFactory {
	constructor() {
		this.title = 'University of ' + faker.fake('{{address.city}}')
	}
}

export default UniversityFactory
