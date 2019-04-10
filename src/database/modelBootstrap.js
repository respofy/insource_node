import Sequelize from 'sequelize'
import {} from 'dotenv/config'

const sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_CONNECTION,
	define: {
		underscored: true,
		timestamps: true
	}
})

// pass your sequelize config here
import User from 'modules/users/models/User'
import City from 'modules/users/models/City'
import Job from 'modules/company/models/Job'

import Language from 'modules/users/models/Language'
import LanguageKnowledge from 'modules/users/models/LanguageKnowledge'
import UserLanguage from 'modules/users/models/UserLanguage'
import Activation from 'modules/users/models/Activation'
import Company from 'modules/company/models/Company'
import Industry from 'modules/users/models/Industry'
import Status from 'modules/users/models/Status'

const models = {
	User: User.init(sequelize, Sequelize),
	City: City.init(sequelize, Sequelize),
	Status: Status.init(sequelize, Sequelize),
	Job: Job.init(sequelize, Sequelize),

	Language: Language.init(sequelize, Sequelize),
	LanguageKnowledge: LanguageKnowledge.init(sequelize, Sequelize),
	UserLanguage: UserLanguage.init(sequelize, Sequelize),
	Industry: Industry.init(sequelize, Sequelize),
	Activation: Activation.init(sequelize, Sequelize),
	Company: Company.init(sequelize, Sequelize)
}

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models))

if (process.env.DB_MIGRATION == 'true') sequelize.sync()

const db = {
	...models,
	sequelize
}

module.exports = db
