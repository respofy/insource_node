import { Sequelize, Model } from 'sequelize'

class UserRole extends Model {
	static init(sequelize) {
		return super.init(
			{
				id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true },
				user_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				role_id: { type: Sequelize.STRING, allowNull: false, unique: false },
				started_at: { type: Sequelize.DATE, allowNull: false },
				finished_at: { type: Sequelize.DATE, allowNull: true },
				active: { type: Sequelize.BOOLEAN, allowNull: false }
			},
			{
				sequelize,
				tableName: 'user_role',
				modelName: 'userRole'
			}
		)
	}

	static associate(models) {
		this.belongsTo(models.User)
		this.belongsTo(models.Role)
	}
}

// export
export default UserRole
