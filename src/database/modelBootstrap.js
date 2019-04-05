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
import UserModel from '../modules/users/models/User'
import LanguageModel from '../modules/users/models/Language'
import LanguageKnowledgeModel from '../modules/users/models/LanguageKnowledge'
import UserLanguageModel from '../modules/users/models/UserLanguage'
import ActivationModel from '../modules/users/models/Activation'
import CompanyModel from '../modules/company/models/Company'
import IndustryModel from '../modules/users/models/Industry'

const models = {
	User: UserModel.init(sequelize, Sequelize),
	Language: LanguageModel.init(sequelize, Sequelize),
	LanguageKnowledge: LanguageKnowledgeModel.init(sequelize, Sequelize),
	UserLanguage: UserLanguageModel.init(sequelize, Sequelize),
	Industry: IndustryModel.init(sequelize, Sequelize),
	Activation: ActivationModel.init(sequelize, Sequelize),
	Company: CompanyModel.init(sequelize, Sequelize)
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
