import { Sequelize, Model } from 'sequelize'

export default class Role extends Model {
	static init(sequelize) {
		return super.init(
			{
				title: { type: Sequelize.STRING, allowNull: false }
			},
			{ sequelize, tableName: 'roles' }
		)
	}

	static associate(models) {
		// Job Relation
		this.hasMany(models.Job)
		// User Relation
		this.belongsToMany(models.User, {
			through: { model: 'user_role', unique: false },
			foreignKey: 'role_id',
		})
	}
}
