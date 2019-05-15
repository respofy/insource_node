import faker from 'faker'

class SkillFactory {
	constructor() {
		this.title = faker.fake('{{name.jobArea}}') + ' Skill'
	}
}

export default SkillFactory
