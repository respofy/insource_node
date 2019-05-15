import faker from 'faker'

class CityFactory {
	constructor() {
		this.name = faker.fake('{{address.city}}')
	}
}

export default CityFactory
