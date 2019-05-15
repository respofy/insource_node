import faker from 'faker'
import generator from 'helper/Generator'

class LanguageFactory {
	constructor() {
		this.title = faker.fake('{{address.country}}') + 'ian'
		this.publish = generator.getRandomInteger(2)
	}
}

export default LanguageFactory
