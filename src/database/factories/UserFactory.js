import faker from 'faker'
import bcrypt from 'bcrypt'
import generator from 'helper/Generator'

let genders = ['male', 'female']

class UserFactory {
	constructor() {
		this.phone = faker.fake('{{phone.phoneNumberFormat}}')
		this.name = faker.fake('{{name.firstName}}')
		this.surname = faker.fake('{{name.lastName}}')
		this.password = bcrypt.hashSync('password', 10)
		this.gender = genders[generator.getRandomInteger(0, 1)]
		this.avatar = faker.fake('{{image.avatar}}')
		this.birthday = faker.fake('{{date.past}}')
		this.city_id = generator.getRandomInteger(1, 5)
		this.status_id = generator.getRandomInteger(1, 2)
		this.about_me = faker.fake('{{lorem.text}}')
		this.incognito = generator.getRandomInteger(2)
	}
}

export default UserFactory
