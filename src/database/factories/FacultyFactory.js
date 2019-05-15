import faker from 'faker'

class FacultyFactory {
	constructor() {
		this.title = faker.fake('{{name.jobArea}}') + ' ფაკულტეტი'
	}
}

export default FacultyFactory
