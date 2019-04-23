import { Sequelize, Model } from 'sequelize'

export default class UserIndustry extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				industry_id: { type: Sequelize.STRING, allowNull: false, unique: false }
			},
			{
				sequelize,
				singular: 'UserIndustry',
				plural: 'UserIndustries',
				tableName: 'user_industries',
				modelName: 'userIndustry'
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Industry)
	}
}
