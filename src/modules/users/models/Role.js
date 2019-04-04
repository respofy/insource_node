import { Sequelize, Model } from 'sequelize'

export default class Role extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{
				sequelize,
				tableName: 'roles'
			}
		)
	}

	static associate(models) {
		this.belongsToMany(models.User, {
			through: 'user_role',
			foreignKey: 'role_id'
		})
	}
}
