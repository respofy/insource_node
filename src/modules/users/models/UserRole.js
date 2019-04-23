import { Sequelize, Model } from 'sequelize'

export default class UserRole extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				role_id: { type: Sequelize.STRING, allowNull: false, unique: false }
			},
			{ sequelize, tableName: 'user_role', modelName: 'userRole' }
		)
	}

	static associate(models) {}
}
