import { Sequelize, Model } from 'sequelize'

export default class UserWorkingType extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				working_type_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE, allowNull: true },
				active: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				singular: 'UserWorkingType',
				plural: 'UserWorkingTypes',
				tableName: 'user_working_type',
				modelName: 'userWorkingType'
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.WorkingType)
	}
}
