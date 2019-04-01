import Sequelize from 'sequelize'
import {} from 'dotenv/config'

const sequelize = new Sequelize(
	process.env.DB_DATABASE,
	process.env.DB_USERNAME,
	process.env.DB_PASSWORD,
	{
		host: process.env.DB_HOST,
		dialect: process.env.DB_CONNECTION,
		define: {
			underscored: true,
			timestamps: true
		}
	}
)

// pass your sequelize config here
import UserModel from '../modules/users/models/user'
import CompanyModel from '../modules/company/models/company'

const models = {
	User: UserModel.init(sequelize, Sequelize),
	Company: CompanyModel.init(sequelize, Sequelize)
}

// Run `.associate` if it exists,
// ie create relationships in the ORM
Object.values(models)
	.filter(model => typeof model.associate === 'function')
	.forEach(model => model.associate(models))

const db = {
	...models,
	sequelize
}

module.exports = db
