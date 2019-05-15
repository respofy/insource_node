import faker from 'faker'

class RoleFactory {
	constructor() {
		this.title = faker.fake('{{name.jobType}}')
	}
}

export default RoleFactory
