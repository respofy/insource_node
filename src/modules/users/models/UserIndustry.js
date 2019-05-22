import { Sequelize, Model } from 'sequelize'

class UserIndustry extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false },
				industry_id: { type: Sequelize.STRING, allowNull: false },
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE, allowNull: true },
				active: { type: Sequelize.BOOLEAN, allowNull: false }
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
// export
export default UserIndustry
